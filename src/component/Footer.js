import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Twitter from '../assets/Twitter.svg'
import Instagram from '../assets/Instagram.svg'
import Youtube from '../assets/YouTube.svg'
import FooterHl from '../assets/FooterHl.svg'

const { width, height } = Dimensions.get('window');
const responsiveWidth = (percent) => (width * percent) / 100;
const responsiveHeight = (percent) => (height * percent) / 100;
const responsiveFontSize = (percent) => (height * percent) / 100;

const Footer = () => {
    return (
        <>
            <View style={styles.footerContainer}>
                <Twitter width={responsiveWidth(8)} height={responsiveHeight(4)} />
                <Instagram width={responsiveWidth(8)} height={responsiveHeight(4)} />
                <Youtube width={responsiveWidth(8)} height={responsiveHeight(4)} />
            </View>
            <FooterHl width={responsiveWidth(45)} height={responsiveHeight(10)} style={styles.footerHorizontal} />
            <View style={styles.contact}>
                <Text style={styles.text}>support@classystore</Text>
                <Text style={styles.text}>+12 123 456 7896</Text>
                <Text style={styles.text}>08:00 - 22:00 - Everyday</Text>
            </View>
            <FooterHl width={responsiveWidth(45)} height={responsiveHeight(10)} style={styles.footerHorizontal} />
            <View style={styles.footerLink}>
                <Text style={styles.link}>About</Text>
                <Text style={styles.link}>Contact</Text>
                <Text style={styles.link}>Blog</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: responsiveHeight(10)
    },
    footerHorizontal: {
        alignSelf: "center"
    },
    contact: {
        alignItems: 'center',
    },
    text: {
        fontSize: responsiveFontSize(2.3),
        color: '#333333',
        marginVertical: responsiveHeight(.5)
    },
    footerLink: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    link: {
        fontSize: responsiveFontSize(2.5),
        color: '#000000',
        marginHorizontal: responsiveWidth(1),
        marginBottom: responsiveHeight(3)
    },
})

export default Footer