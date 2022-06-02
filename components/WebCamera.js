import { Button, Stack, Text } from '@chakra-ui/react';
import react from 'react';
import { useModel } from '../context/loadModel';

function WebCamera() {
  const video = document.getElementById('camera');
  const liveView = document.getElementById('liveview');
  const [clicked, setClicked] = react.useState(false);

  const { model } = useModel();

  var children = [];

  //   var model = true;

  let score;

  function predictWebcam() {
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function (predictions) {
      // Remove any highlighting we did previous frame.
      for (let i = 0; i < children.length; i++) {
        liveView.removeChild(children[i]);
      }
      children.splice(0);

      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        // If we are over 66% sure we are sure we classified it right, draw it!
        if (predictions[n].score > 0.66) {
          //   console.log(predictions[n].score);
          const p = document.createElement('p');
          score = Math.round(parseFloat(predictions[n].score) * 100);
          p.innerText =
            predictions[n].class +
            ' - with ' +
            Math.round(parseFloat(predictions[n].score) * 100) +
            '% confidence.';
          p.style =
            'margin-left: ' +
            predictions[n].bbox[0] +
            'px; margin-top: ' +
            (predictions[n].bbox[1] - 10) +
            'px; width: ' +
            (predictions[n].bbox[2] - 10) +
            'px; top: 0; left: 0;';

          const highlighter = document.createElement('div');
          highlighter.setAttribute('class', 'highlighter');
          highlighter.style =
            'left: ' +
            predictions[n].bbox[0] +
            'px; top: ' +
            predictions[n].bbox[1] +
            'px; width: ' +
            predictions[n].bbox[2] +
            'px; height: ' +
            predictions[n].bbox[3] +
            'px;';

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
        }
      }

      // Call this function again to keep predicting when the browser is ready.
      window.requestAnimationFrame(predictWebcam);
    });
  }

  // activate web cam thro prompt
  function activateWebCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
      return;
    }

    // getUsermedia parameters to force video but not audio.
    const constraints = {
      video: true,
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      video.srcObject = stream;
      video.addEventListener('loadeddata', predictWebcam);
      console.log('Predict ufntion added');
    });
  }

  // check if web cam is supported?
  function enableWebCam(event) {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      setClicked(true);
      activateWebCam(event);
      console.log('getUserMedia supported.');
    } else {
      alert('Webcam not supported');
      return;
    }
  }

  return (
    <div>
      <Stack margin="30px 0">
        <Button disabled={clicked} onClick={(e) => enableWebCam(e)}>
          Enable Camera
        </Button>
      </Stack>
      {/* <Text>Prediction score {score}</Text> */}
      <div id="liveview" className="camView">
        <video id="camera" width="100%" height="100%" autoPlay muted></video>
      </div>
    </div>
  );
}

export default WebCamera;
