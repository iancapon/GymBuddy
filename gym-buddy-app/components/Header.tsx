import { Alert, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useMemo, useState, useCallback, useContext, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Boton from './Boton';
import { ReactNode } from 'react';

type headerProp = {
    backButton: boolean
    children?: ReactNode
    theme: any //tema de colores falta estandarizar

}

export default function Header(props: headerProp) {
    const _theme = props.theme
    const router = useRouter()
    return (
        < View style={[styles.header, { backgroundColor: _theme.header, height: 120 }]} >
            {props.backButton ? <Boton
                onPress={() => router.back()}
                viewStyle={[styles.backButton, { backgroundColor: _theme.header }]}>
                <Ionicons name="arrow-back" size={24} color={_theme.text} />
            </Boton> : <View style={styles.backButton} />}
            <Text style={[styles.headerTitle, { color: _theme.text }]}>{props.children}</Text>
            <View style={{ width: 24 }} />
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f1115',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#1b1d23',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    backButton: {
        padding: 12,
        borderRadius: 100
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    instructionCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(77, 182, 255, 0.1)',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(77, 182, 255, 0.3)',
    },
    instructionText: {
        flex: 1,
        marginLeft: 12,
        color: '#e8f0ff',
        fontSize: 14,
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    dayCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1b1d23',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2b2e36',
    },
    dayInfo: {
        flex: 1,
    },
    dayName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    assignedRoutine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    routineName: {
        fontSize: 14,
        color: '#43e97b',
        marginLeft: 6,
    },
    noRoutine: {
        fontSize: 14,
        color: '#94a3b8',
        fontStyle: 'italic',
    },
    dayActions: {
        marginLeft: 12,
    },
    addButton: {
        padding: 4,
    },
    removeButton: {
        padding: 4,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#43e97b',
        padding: 18,
        borderRadius: 12,
        marginTop: 24,
        marginBottom: 40,
    },
    saveButtonDisabled: {
        backgroundColor: '#94a3b8',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 8,
    },
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        flex: 1,
        marginRight: 12,
    },
    routineList: {
        paddingHorizontal: 20,
    },
    routineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    routineItemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    routineItemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    routineItemExercises: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 40,
    },
});