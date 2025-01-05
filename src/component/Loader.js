import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";

const Loader = ({ loading, setLoading }) => {

    return (
        <Modal
            transparent={true}
            visible={loading}
        >
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color="black" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
})

export default Loader