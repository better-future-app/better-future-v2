import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Image from 'react-native-scalable-image';
const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Home")}
            onDone={() => navigation.navigate("Home")}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../images/logo.png')} />,
                    title: 'Welcome!',
                    subtitle: 'We hope our ESG investment app will be invaluable in leading your investment choices',
                },
                {

                    backgroundColor: '#fdeb93',
                    title: 'What is this app for? What is an ESG score?',
                    subtitle: 'Environmental, social, and governance (ESG) criteria are a set of standards for a company\'s operations that socially conscious investors use to screen potential investments. This is compiled into rating for analysing how well a company is abiding by the ESG criteria.  This app directs you to companies ESG scores and aids in helping you see how well your portolio meets this standard',
                },
                {
                    backgroundColor: '#FFFFFF',

                    image: <Image
                        resizeMode="contain"
                        height={Dimensions.get('window').height}
                        width={Dimensions.get('window').width - 5} // height will be calculated automatically
                        source={require('../images/screen1.png')} />,
                    title: 'Become The Star',
                    subtitle: "Let The Spot Light Capture You",
                },
                {
                    backgroundColor: '#FFFFFF',

                    image: <Image
                        resizeMode="contain"
                        height={Dimensions.get('window').height}
                        width={Dimensions.get('window').width - 5} // height will be calculated automatically
                        source={require('../images/screen2.png')} />,
                    title: 'Become The Star',
                    subtitle: "Let The Spot Light Capture You",
                },
                {
                    backgroundColor: '#FFFFFF',

                    image: <Image
                        resizeMode="contain"
                        height={Dimensions.get('window').height}
                        width={Dimensions.get('window').width - 5} // height will be calculated automatically
                        source={require('../images/screen3.png')} />,
                    title: 'Become The Star',
                    subtitle: "Let The Spot Light Capture You",
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});