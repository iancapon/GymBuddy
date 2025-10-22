import { StyleSheet, Modal, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import Boton from './Boton';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

type props = {
    visible: boolean;
    setVisible: (v: boolean) => void;
    titulo: string;
    subtitulo: string;
    botonA?: string
    botonAOnPress?: () => void
    botonB?: string
    botonBOnPress?: () => void
};

export default function ModalAlerta(props: props) {
    return (
        <Modal animationType="fade" transparent visible={props.visible} onRequestClose={() => props.setVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>{props.titulo}</Text>
                    <Text style={styles.modalSubtitle}>{props.subtitulo}</Text>
                    {
                        props.botonA != undefined ?
                            <Boton
                                name={props.botonA}
                                viewStyle={styles.modalButton}
                                textStyle={styles.modalButtonText}
                                onPress={props.botonAOnPress}
                            /> : <></>
                    }
                    {
                        props.botonB != undefined ?
                            <Boton
                                name={props.botonB}
                                viewStyle={styles.modalButton}
                                textStyle={styles.modalButtonText}
                                onPress={props.botonBOnPress}
                            /> : <></>
                    }
                </View>
            </View>
        </Modal>
    );
}


const COLORS = {
    overlay: 'rgba(0,0,0,0.55)',
    card: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    white: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.75)',
    accent: '#FF7A00',
    lightAccent: '#FFB46B',
    shadow: 'rgba(0,0,0,0.5)',
};

const styles = StyleSheet.create({
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.overlay },
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    instruction: {
        color: COLORS.textMuted,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 15,
    },
    calendar: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
    },
    sectionTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        alignSelf: 'center',
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 14,
        marginVertical: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    listTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '700',
    },
    listDate: {
        color: COLORS.textMuted,
        fontSize: 14,
    },
    listButton: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    listButtonText: {
        color: '#111',
        fontWeight: '800',
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalCard: {
        width: '90%',
        maxWidth: 380,
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: 'rgba(30,30,30,0.9)',
    },
    modalTitle: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 6,
    },
    modalSubtitle: {
        color: COLORS.textMuted,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: COLORS.accent,
        borderRadius: 12,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    modalButtonText: {
        color: '#111',
        fontWeight: '800',
        fontSize: 16,
    },
});
