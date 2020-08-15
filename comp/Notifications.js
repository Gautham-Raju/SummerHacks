import React, { useState } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ToggleSwitch from 'toggle-switch-react-native'

const { width, height } = Dimensions.get('window')

export default function Notifications({navigation}) {

    const [on, setOn] = useState(true);
    const [on2, setOn2] = useState(true);
    const [on3, setOn3] = useState(true);
    const [on4, setOn4] = useState(true);
    const [on5, setOn5] = useState(true);
    const [on6, setOn6] = useState(true);
    const [on7, setOn7] = useState(true);

    const open = () => {
        navigation.openDrawer()
    }

    return (
    <View style={{
        flex: 1,
        backgroundColor: 'white'
    }}>
        <Feather name="arrow-left" style = {{
        position: 'absolute',
        marginLeft: 25,
        marginTop: 58,
        fontSize: 25,
        color: '#094067'}} onPress = {open}/>
    <Text style = {{position: 'absolute', color: '#094067', fontSize: 25, marginLeft: 60, marginTop: 50}}>Show Notifications</Text>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 60}}>
    <ToggleSwitch
        isOn={on}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on == true ? setOn(false) : setOn(true)
        }}
        />
    </View>
    <Text style = {{fontSize: 24, position: 'absolute', color: '#094067', marginLeft: 30, marginTop: 120}}>Announcements</Text>
    <Text style = {{color: '#737373', width: width- 140, marginLeft: 30, marginTop: 160, fontSize: 16, position: 'absolute'}}>Get notified when you get a new announcement</Text>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 175}}>
    <ToggleSwitch
        isOn={on2}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on2 == true ? setOn2(false) : setOn2(true)
        }}
        />
    </View>

    <Text style = {{fontSize: 24, position: 'absolute', color: '#094067', marginLeft: 30, marginTop: 240}}>Election</Text>
    <Text style = {{color: '#737373', width: width- 140, marginLeft: 30, marginTop: 280, fontSize: 16, position: 'absolute'}}>Get notified when you have an upcoming election</Text>
    <Text style = {{color: '#737373', width: width- 140, marginLeft: 30, marginTop: 340, fontSize: 16, position: 'absolute'}}>Get notified when the results of an election are released</Text>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 295}}>
    <ToggleSwitch
        isOn={on3}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on3 == true ? setOn3(false) : setOn3(true)
        }}
        />
    </View>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 357}}>
    <ToggleSwitch
        isOn={on4}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on4 == true ? setOn4(false) : setOn4(true)
        }}
        />
    </View>

    <Text style = {{fontSize: 24, position: 'absolute', color: '#094067', marginLeft: 30, marginTop: 420}}>Communication</Text>
    <Text style = {{color: '#737373', width: width- 140, marginLeft: 30, marginTop: 460, fontSize: 16, position: 'absolute'}}>Get notified when you get a new message</Text>
    <Text style = {{color: '#737373', width: width- 140, marginLeft: 30, marginTop: 520, fontSize: 16, position: 'absolute'}}>Get notified when you get added to a new group</Text>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 475}}>
    <ToggleSwitch
        isOn={on5}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on5 == true ? setOn5(false) : setOn5(true)
        }}
        />
    </View>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 538}}>
    <ToggleSwitch
        isOn={on6}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on6 == true ? setOn6(false) : setOn6(true)
        }}
        />
    </View>

    <Text style = {{fontSize: 24, position: 'absolute', color: '#094067', marginLeft: 30, marginTop: 600}}>Calendar</Text>
    <Text style = {{color: '#737373', width: width- 140, marginLeft: 30, marginTop: 640, fontSize: 16, position: 'absolute'}}>Get notified when you have an upcoming calendar event</Text>
    <View style = {{position: 'absolute', marginLeft: 320, marginTop: 658}}>
    <ToggleSwitch
        isOn={on7}
        onColor="#3da9fc"
        offColor="#e0e0e0"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="medium"
        onToggle={() => {
            on7 == true ? setOn7(false) : setOn7(true)
        }}
        />
    </View>

    <Image source = {require('./notif.png')} style = {{position: 'absolute', height: 185, width: 225, marginLeft: 85, marginTop: 710}}/>
    </View>
    );
}