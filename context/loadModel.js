import { createContext, useContext, useState, useEffect } from 'react';

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

const Context = createContext({
  isLoading: false,
  setIsLoading: () => {},
  model: null,
  documentIsLoading: false,
});

const ModelProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [documentIsLoading, setDocumentIsLoading] = useState(true);
  const [model, setModel] = useState();

  // document is not defined error
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        setDocumentIsLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
      setIsLoading(false);
    });
  }, []);

  const exposed = {
    isLoading,
    setIsLoading,
    model,
    documentIsLoading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useModel = () => useContext(Context);

export default ModelProvider;
