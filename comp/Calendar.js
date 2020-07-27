import React, {useState} from 'react';
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal, Keyboard } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import EventForm from './EventForm.js'

const { width, height } = Dimensions.get('window')

function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
  };
  }

  const colors = ['#20639B', '#3CAEA3', '#ff5630', '#ED553B']
  var chooser = randomNoRepeats(colors);


const timeToString = (time) => {

    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  
  const Schedule: React.FC = () => {
    const [items, setItems] = useState({
    '2020-07-28': [{startTime: '10:00AM', endTime: '12:00PM',description: 'VOTE!', title: 'Club Elections', color: chooser()}],
    '2020-07-29': [{startTime: '1:00PM', endTime: '4:00PM',description: "Don't forget bread", title: 'Pick Up Groceries', color: chooser()}],
    '2020-07-30': [{startTime: '4:00PM', endTime: '12:00AM',description: 'Text about the group project', title: 'Text Allie', color: chooser()}, 
    {startTime: '1:30PM', endTime: '3:00PM', description: 'Study for Introduction to Computer Science', title: 'Test', color: chooser()}]})

  const addEvent = (event) =>{
    event.key = event.date
      setItems((currentEvents) => {
          return [event, ...currentEvents];
      });
      setModalOpen(false);
  }
  
    const loadItems = (day) => {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!items[strTime]) {
            items[strTime] = [];
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
        <TouchableOpacity activeOpacity = {1.0} style={{marginRight: 10, marginTop: 17}}>
          <Card>
            <Card.Content>
              <View style = {{flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 10}}>
              <View style = {{flexDirection: 'column', width: 200}}>
                <Text style = {{fontSize: 14, color: '#094067'}}>{item.startTime} - {item.endTime}</Text>
                <Text style = {{fontSize: 16, color: '#094067', paddingTop: 2}}>{item.title}</Text>
                <Text style = {{fontSize: 12, color: '#5f6c7b', paddingTop: 6}}>{item.description}</Text>
              </View>
              <Avatar.Text size = {50} color = {'white'} backgroundColor = {item.color} label = {item.title.charAt(0)}/>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      );
    };

    const [modalOpen, setModalOpen] = useState(false);

    const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    const [currentMonth, setCurrentMonth] = useState( monthNames[new Date().getMonth()]);

    return (
      <View style={{flex: 1}}>
        <View style = {{width: width, height: height/10, backgroundColor: 'rgb(9, 136, 228)'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
    <Text style = {{paddingTop: height/ 20, paddingLeft: width/16, fontSize: 24, color: 'white'}}>{currentMonth}</Text>
        <Feather name="calendar" style = {{color: 'white', paddingRight: height/32, paddingTop: height/18, fontSize: 24}}/>
        </View>
        </View>
        <Modal visible = {modalOpen}
                backdropColor = {'white'} backdropOpacity = {1} onBackdropPress={()=>this.closeModal()} 
                transparent= {true}>
                    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000080'}}>
                            <View style={{
                                    width: 250,
                                    height: 525,
                                    backgroundColor: '#fff', padding: 20, borderRadius: 25}}>
                                    <Text style = {{color: '#094067', fontSize: 20}}>Add Event</Text>
                                <EventForm addEvent = {addEvent}/>
                                <Text onPress = {() => setModalOpen(false)} 
                                style = {{color: '#094067', fontWeight: 'bold', paddingLeft: 12, paddingTop: 30}}>
                                    CANCEL
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
        <Agenda
            onDayPress={(date) => setCurrentMonth(`${moment(date.dateString).format('MMMM')}`)}
            items={items}
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            theme={{
              selectedDayTextColor: '#ffffff',
              selectedDayBackgroundColor: 'rgb(9, 136, 228)',
              dotColor: 'rgb(9, 136, 228)',
              selectedDotColor: 'white',
              dayTextColor: '#90b4ce',
              todayTextColor: 'rgb(9, 136, 228)',
              textSectionTitleColor: 'rgb(9, 136, 228)',
              agendaTodayColor: 'rgb(9, 136, 228)',
              agendaDayTextColor: '#C0C0C0',
              agendaDayNumColor: '#C0C0C0',
              monthTextColor: '#094067',
              textMonthFontSize: 20,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              },
              
            }}
        />
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress = {() => setModalOpen(true)}>
          <View style = {styles.button}>
            <Feather name = 'plus' size = {24} color = 'white'/>
          </View>
        </TouchableWithoutFeedback>
      </View>
      </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
        marginLeft: width * .85,
        marginTop: height * .86,
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#F02A4B',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        backgroundColor: '#ef4565',
    },
    modal: {

    }
  })

  export default Schedule;