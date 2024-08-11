import { Text, View } from "react-native";
import { Link } from "expo-router";
import {Colors} from './../constants/Colors';
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
export default function Index() {
  const {user} = useUser();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user?
        <Redirect href={'/(tabs)/home'} />
        :<Redirect href={'/login'}/>}
    </View>
  );
}
