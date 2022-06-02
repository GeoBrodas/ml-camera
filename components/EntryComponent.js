import { Alert, Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useModel } from '../context/loadModel';
import WebCamera from './WebCamera';

function EntryComponent() {
  const { documentIsLoading, isLoading } = useModel();

  return (
    <Center paddingY={'40px'} flexDirection="column">
      <Stack>
        <Heading
          bgClip={'text'}
          bgGradient={'linear-gradient(90deg, #1E2A78 0%, #FF2E4C 100%)'}
          fontSize={'3xl'}
        >
          Smart Object detection
        </Heading>

        <Text>
          This is a smart object detection app. It uses TensorFlow.js and the
          COCO-SSD library to detect objects in images.
        </Text>
      </Stack>

      <Stack>
        {isLoading && (
          <Alert status="info" margin="20px 0">
            <Spinner marginRight="10px" />
            COCO-SSD is loading, please be patient..
          </Alert>
        )}
      </Stack>

      {/* Main Web Camera Component */}
      {!documentIsLoading && !isLoading && <WebCamera />}
    </Center>
  );
}

export default EntryComponent;
