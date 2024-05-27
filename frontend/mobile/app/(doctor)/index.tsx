import React, { Component, ContextType } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatsCard from '../../components/StatsCard';
import SearchBar from '../../components/SearchBar';
import statsData from '../../assets/data/statsData';
import ConsultationCard from '../../components/ConsultationCard';
import consultationData from '../../assets/data/consultationData';
import { UserContext, UserT } from '../../contexts/UserContext';

class Index extends Component {
  static contextType = UserContext;

  render() {
    const context = this.context as ContextType<typeof UserContext>;
    const { userDetails } = this.context as { userDetails: UserT };

    return (
      <ScrollView>
        {/* doctor's overview */}
        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require("../../assets/images/doctorpic.jpg")} style={{ width: 80, height: 80, borderRadius: 40 }} />
            <View style={{ marginLeft: 4 }}>
              <Text style={{ color: 'black', fontSize: 14 }}>Welcome Dr</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#045883' }}>Dr. {userDetails.name || "Saad Hassan"}</Text>
            </View>
          </View>
          <Ionicons size={28} name="notifications-outline" color='black' />
        </View>

        {/* searchbar for searching patients*/}
        <SearchBar placeholder={"Search patients by name..."} />

        {/* daily overview section */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Daily Overview</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {statsData.map((data, index) => (
              <StatsCard key={index} icon={data.icon} title={data.title} value={data.value} />
            ))}
          </View>
        </View>

        {/* latest consultation section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <View style={{ marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pending Consultations</Text>
            <TouchableOpacity>
              <Text style={{ color: '#045883', fontSize: 16 }}>See All</Text>
            </TouchableOpacity>
          </View>
          {consultationData.slice(0, 2).map((data, index) => (
            <ConsultationCard key={index} patientName={data.patientName} timings={data.timings} date={data.date} />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default Index;
