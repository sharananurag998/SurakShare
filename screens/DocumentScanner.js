import React, { Component } from "react";
import { View, Image } from "react-native";

import DocumentScanner from "react-native-document-scanner";
import defaultImage from "../assets/defaultImage.jpg";


class DocScanner extends Component {

  // constructor(){
  //   this.setState({image:defaultImage})
  // }
  state = { 
    image: defaultImage
  }
    
  render() {
    
    return (
      <View>
        <DocumentScanner
          useBase64
          saveInAppDocument={false}
          onPictureTaken={data =>
            this.setState({
              image: data.croppedImage,
              initialImage: data.initialImage,
              rectangleCoordinates: data.rectangleCoordinates
            })
          }
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          brightness={0.3}
          saturation={1}
          contrast={1.1}
          quality={0.5}
          onRectangleDetect={({ stableCounter, lastDetectionType }) =>
            this.setState({ stableCounter, lastDetectionType })
          }
          detectionCountBeforeCapture={5}
          detectionRefreshRateInMS={50}
          onPermissionsDenied={() => console.log("Permissions Denied")}
        />
        <Image
          source={{ uri: `data:image/jpeg;base64,${this.state.image}` }}
          resizeMode="contain"
        />
      </View>
    );


    {/* <DocumentScanner ref={ref => (this.scanner = ref)} /> */}
    // this.scanner.capture();
    
  }
}

export default DocScanner;