import React from "react";
import * as Fonts from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";

export default class CreateStory extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
        previewImage: "image_1"
        
      };
    }
    async addPost(){
      if(
       this.state.caption
      ){
       let postData={
         preview_image:this.state.previewImage,
        caption:this.state.caption,
         author:firebase.auth().currentUser.displayName,
         created_On:new Date(),
         author_uid:firebase.auth().currentUser.uid,
         profile_image:this.state.profile_image,
         likes:0
       };
       await firebase.database()
     .ref("/posts/"+(Math.random().toString(36).slice(2)))
     .set(postData)
     .then(function(snapshot){ })
     this.props.setUpdateToTrue();
     this.props.navigation.navigate("feed")
      }
      else{
       Alert.alert("error","all fieldes are required",
       
       [
         {
           text:"ok",
           onPress:()=>console.log("okpressed")
         }
       ],{cancelable:false}
       )
      }
     
      }
    render() {

 let preview_images = {
    image_1: require("../assets/story_image_1.png"),
    image_2: require("../assets/story_image_2.png"),
    image_3: require("../assets/story_image_3.png"),
    image_4: require("../assets/story_image_4.png"),
    image_5: require("../assets/story_image_5.png"),

};
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            ></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
            <DropDownPicker
                items={[
                  { label: "Image 1", value: "image_1" },
                  { label: "Image 2", value: "image_2" },
                  { label: "Image 3", value: "image_3" },
                  { label: "Image 4", value: "image_4" },
                  { label: "Image 5", value: "image_5" },
                ]}
                defaultValue={this.state.previewImage}
                containerStyle={{
                  height:40,
                  borderRadius:20,
                  marginBottom:10,
                }

                }
               
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: "transparent",
                 
                }}
                textStyle={{
                  justifyContent: "flex-start"
                }}

                dropDownStyle={{backgroundColor:"#2a2a2a"}}

                  labelStyle={{
                     
                    color:"white"
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      previewImage: item.value,
                    })
                  }
                

               
              />
            </View>
            <ScrollView>
              <TextInput
              style={styles.InputFont}
              onChangeText={(caption)=>this.setState({caption})}
              placeholder={"caption"}
              placeholderTextColor="white"
              
              >
              </TextInput>
            </ScrollView>
          </View>
          <View style={styles.SubmitButton}/>
          <Button onPress={()=>this.addPost()}
          title="submit"
          color={"blue"}
          ></Button>
        </View>
      );

            }
          }      
          
  