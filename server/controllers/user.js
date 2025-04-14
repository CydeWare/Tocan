import User from '../models/User.js';
import VolunteerDetails from '../models/VolunteerDetails.js';
import DisabledUserDetails from '../models/DisabledUserDetails.js';

export const signin = async (req,res) => {
  const { email, password } = req.body;

  try {

      const existingUserArr = await User.findAll({ where: { Email: email } });

      if (existingUserArr?.length <= 0) {
          console.log("User doesn't exist!");
          return res.status(400).json({ message: "User doesn't exist. "})
      }

      const existingUser = existingUserArr[0];

      console.log("Existing User:", existingUser);
      
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.PasswordHash);

      if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials. "})

      const token = jwt.sign({ email: existingUser.Email, id: existingUser.UserID}, "test", {expiresIn: "1h"})

      console.log("Token: ", token);

      res.status(200).json({ result: existingUser, token });
  } catch (err) {
      res.status(500).json({ message: err.message })
  }

  //In google login, make your own token?

}

export const signup = async (req,res) => {
  const { email, password, confirmPassword, firstName, lastName, address, phoneNumber, city, profilePictureURL, zipCode, country, role, langitude, longitude } = req.body;

  try {

      if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match. "})

      const existingUser = await User.findOne({ where: { Email: email } });

      if (existingUser) {
          console.log("Existing user: ", existingUser);
          console.log("User already exists!");
          return res.status(400).json({ message: "User already exist. "})
      }

      if(role.length === 0){
          role = "customer";
      }
      

      const hashedPassword = await bcrypt.hash(password, 12)

      // console.log(firstName, lastName, email);

      // const result = await User.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName})

      const [rows] = await db.query("INSERT INTO Users (UserID, FullName, Email, PasswordHash, PhoneNumber, Address, City, PostalCode, Country, Role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, fullName, email, hashedPassword, phoneNumber, address, city, postalCode, country, role]);

      // Get the inserted ID (only if UserID is AUTO_INCREMENT)
      // const insertedId = rows.insertId;

      console.log("Result from rows: ", rows);

      // Fetch the inserted data
      const [rowsResult] = await db.query("SELECT * FROM Users WHERE UserID = ?", [id]);

      // The first row contains the newly inserted user
      const result = rowsResult[0];

      // console.log(newUser);

      console.log("Result: ", result);

      const token = jwt.sign({ email: result.Email, id: result.UserID}, "test", {expiresIn: "1h"})

      res.status(200).json({ result, token }); //result: result (the same)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
}


export const register = async (req, res) => {
  try {
    const { Email, PasswordHash, UserType, ...userData } = req.body;
    
    if (!Email || !PasswordHash || !UserType) {
      return res.status(400).json({ error: 'Email, password and user type are required' });
    }

    const newUser = await User.create({
      Email,
      PasswordHash,
      UserType,
      ...userData
    });

    if (UserType === 'volunteer') {
      await VolunteerDetails.create({ UserID: newUser.UserID });
    } else if (UserType === 'disabled') {
      await DisabledUserDetails.create({ UserID: newUser.UserID });
    }

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: VolunteerDetails, required: false },
        { model: DisabledUserDetails, required: false }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Add other user controller methods...