	/**********************************************************************
		Copyright 2020 Misty Robotics
		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at
			http://www.apache.org/licenses/LICENSE-2.0
		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
		limitations under the License.

		**WARRANTY DISCLAIMER.**

		* General. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MISTY
		ROBOTICS PROVIDES THIS SAMPLE SOFTWARE "AS-IS" AND DISCLAIMS ALL
		WARRANTIES AND CONDITIONS, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
		INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
		PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, AND NON-INFRINGEMENT OF
		THIRD-PARTY RIGHTS. MISTY ROBOTICS DOES NOT GUARANTEE ANY SPECIFIC
		RESULTS FROM THE USE OF THIS SAMPLE SOFTWARE. MISTY ROBOTICS MAKES NO
		WARRANTY THAT THIS SAMPLE SOFTWARE WILL BE UNINTERRUPTED, FREE OF VIRUSES
		OR OTHER HARMFUL CODE, TIMELY, SECURE, OR ERROR-FREE.
		* Use at Your Own Risk. YOU USE THIS SAMPLE SOFTWARE AND THE PRODUCT AT
		YOUR OWN DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE FOR (AND MISTY
		ROBOTICS DISCLAIMS) ANY AND ALL LOSS, LIABILITY, OR DAMAGES, INCLUDING TO
		ANY HOME, PERSONAL ITEMS, PRODUCT, OTHER PERIPHERALS CONNECTED TO THE PRODUCT,
		COMPUTER, AND MOBILE DEVICE, RESULTING FROM YOUR USE OF THIS SAMPLE SOFTWARE
		OR PRODUCT.

		Please refer to the Misty Robotics End User License Agreement for further
		information and full details:
			https://www.mistyrobotics.com/legal/end-user-license-agreement/
	**********************************************************************/

misty.Debug("Multiple Personality is running")

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
            misty.DisplayImage("e_Anger.jpg");
            misty.PlayAudio("s_Anger.wav");
            //Need to add in some movements too like Head Roll and movement
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor pressed")
            //Misty is Sad
            //randomly plays a sound
            misty.DisplayImage("e_Sadness.jpg");
            misty.PlayAudio("s_Sadness.wav");
            break

        case "Bump_RearRight":
            //Misty is Happy
            misty.Debug("rear right bump sensor pressed")
            misty.DisplayImage("e_Joy.jpg");
            misty.PlayAudio("s_Joy.wav");
            break

        case "Bump_RearLeft":
            //Misty is Disdainful
            misty.Debug("rear left bump sensor pressed")
            misty.DisplayImage("e_Disgust.jpg");
            misty.PlayAudio("s_Disgust.wav");
            break
    }
}

