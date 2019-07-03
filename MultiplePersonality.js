misty.Debug("MakerFaire Skill is running")

// Return data when a bump sensor is pressed
misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
// Return the sensorName property of
// BumpSensor events
misty.AddReturnProperty("BumpSensor", "sensorName");
// Register for BumpSensor events
misty.RegisterEvent("BumpSensor", "BumpSensor", 1000, true);

//Randomly Plays a Sound

function _GetAudioList(data) {
    // Check if data was received
    if (data) {
        // Capture the array of files
        let audioArr = data.Result;

        // Generate a random number and use it to choose a filename at 
        // random from the list
        let randNum = Math.floor(Math.random() * audioArr.length);
        let randSound = audioArr[randNum].Name;
        // Print the name of the file
        misty.Debug(randSound);

        // Issue command to play the audio clip
        misty.PlayAudio(randSound);
    }
}

function _GetImageList(data) {
    // Check if data was received
    if (data) {
        // Capture the array of files
        let imageList = data.Result;

        // Generate a random number and use it to choose a filename at 
        // random from the list
        let randNum = Math.floor(Math.random() * imageList.length);
        let randImage = imageList[randNum].Name;
        // Print the name of the file
        misty.Debug(randImage);

        // Issue command to play the audio clip
        misty.DisplayImage(randImage);
    }
}

// Handle BumpSensor event data
function _BumpSensor(data) {
    // Store the name of the touched sensor
    let sensorName = data.AdditionalResults[0];

    // Play a different audio clip when
    // each sensor is pressed
    switch (sensorName) {

        case "Bump_FrontRight":
            //Misty is Angry
            misty.Debug("front right bump sensor pressed");
            misty.DisplayImage("Angry.png");
            misty.PlayAudio("010-Eh.wav");
            //Need to add in some movements too
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor pressed")
            //Misty is Sad
            //randomly plays a sound
            misty.DisplayImage("Sad.png");
            misty.PlayAudio("003-UmmMmmUmm.wav");
            break

        case "Bump_RearRight":
            //Misty is Happy
            misty.Debug("rear right bump sensor pressed")
            misty.DisplayImage("Happy.png");
            misty.PlayAudio("007-OuuuUUO.wav");
            break

        case "Bump_RearLeft":
            //Misty is Disdainful
            misty.Debug("rear left bump sensor pressed")
            misty.DisplayImage("Disdainful.png");
            misty.PlayAudio("044-RRrAaaRw.wav");
            break
    }
}

