import React from 'react';
import axios from 'axios';

import '../App.css';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { API_ENDPOINT } from '../utils/constants';

function LiveClass() {
// const [signature, setSignature] = React.useState('');
//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'http://localhost:4210/api/create/meeting'
//       };
      
//       axios.request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         setSignature(JSON.stringify(response.data))
//       })
//       .catch((error) => {
//         console.log(error);
//       });

  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = `${API_ENDPOINT}/api/create/meeting-sign`
  var sdkKey = 'dm85ooCsSFGAjm5ovqUkA'
  var meetingNumber = '84888580031'
  var passWord = ''
  var role = 0
  var userName = 'React'
  var userEmail = ''
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });

    client.join({
      signature: signature,
    	sdkKey: sdkKey,
    	meetingNumber: meetingNumber,
    	password: passWord,
    	userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
      zak: zakToken
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default LiveClass;

