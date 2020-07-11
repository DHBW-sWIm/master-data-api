var crypto = require('crypto');

module.exports = (req, res, next) => {
    try {
      console.log("Check-Authentication Start");

      // extracting the password and username from the header
      const header = req.headers['authorization'];
      token=header.split(" ");
      auth=new Buffer.from(token[1], 'base64').toString();
      var parts = auth.split(":");
      var username=parts[0];
      var password=parts[1];
      console.log("Username: " + username);
      console.log("Password: " + password);

      // converting the logindata to sha-hashes
      username = crypto.createHash('sha256').update(username).digest('hex');
      password = crypto.createHash('sha256').update(password).digest('hex');
      console.log("Username2: " + username);
      console.log("Password2: " + password);

      // checking passwords @TODO use funtions for multiple possible usernames?
      if (username != null && password != null && username == "b86b79afea2c74bcc00d19fc1e94cd5f3592d2d94d9be9d9ccf43356087c3d12" && password == "0a99c2e71ed89bbfc1c52fa175d7a1b29bddda60cc8ac155efe39dd435cb5dbb"){
        console.log("Authentication Success!");
      next();
      } else {
        console.log("Authentication Fail!");
        res.status(401).json({ message: "Wrong Credentials!" });
      }
    } catch (error) {
      console.log("Authentication Fail! " + error);
      res.status(401).json({ message: "Authentication failed!" });
    }
  };
  