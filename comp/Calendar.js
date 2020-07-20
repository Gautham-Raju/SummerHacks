import React, {useState} from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';


const { width, height } = Dimensions.get('window')

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  
  const Schedule: React.FC = () => {
    const [items, setItems] = useState({'2020-07-22': [{name: 'item 1 - any js object'}],
    '2020-07-23': [{name: 'item 2 - any js object', height: 80}],
    '2020-07-24': [],
    '2020-07-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]});;
  
    const loadItems = (day) => {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!items[strTime]) {
            items[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
          }
        }
        const newItems = {};
        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        setItems(newItems);
      }, 1000);
    };
  
    const renderItem = (item) => {
      return (
        <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
          <Card>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>{item.name}</Text>
                <Avatar.Text label="J" />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      );
    };
  
    return (

      <View style={{flex: 1}}>
        <View style = {{width: width, height: height/10, backgroundColor: 'rgb(9, 136, 228)'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style = {{paddingTop: height/ 20, paddingLeft: width/16, fontSize: 24, color: 'white'}}>Schedule</Text>
        <Feather name="plus" style = {{color: 'white', paddingRight: height/32, paddingTop: height/18, fontSize: 24}}/>
        </View>
        </View>
        <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            theme={{
              selectedDayTextColor: '#ffffff',
              selectedDayBackgroundColor: 'rgb(9, 136, 228)',
              dotColor: 'rgb(9, 136, 228)',
              selectedDotColor: 'white',
              dayTextColor: '#c6c6c6',
              todayTextColor: 'rgb(9, 136, 228)',
              textSectionTitleColor: 'rgb(9, 136, 228)',
            }}
        />
      </View>
    );
  };
  
  export default Schedule;