import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql'
import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotFoundScreen from '../screens/NotFoundScreen';
import { View, Text, ItemContainer, TextInput, Modal } from './Themed';

interface itemInterface {
    id: number,
    name: string,
    type?: string,
    gender?: string,
    species?: string,
    image?: string,
    dimension?: string,
    residents?: [{
        name: string,
        image: string
    }],
    episode?: string,
    air_date?: string,
    characters?: [{
        name: string,
        image: string
    }]
}

interface ContentProps {
    query: DocumentNode,
    dataAttib: string,
    onSeletedTypeName: "name" | "type",
    filter: string
}

interface queryOptionsInterface {
    name: string,
    type: string,
    page: number
}

interface itemProps { elem: itemInterface, onPress: () => void }
const Item = ({ elem, onPress }: itemProps) => (
    <TouchableOpacity onPress={onPress}>
        <ItemContainer style={styles.itemContainer}>
            {elem.image && <Image style={styles.image} source={{ uri: elem.image }} />}
            <Text style={styles.textImg}> {elem.name} </Text>
        </ItemContainer>
    </TouchableOpacity>

)

const ContentHandler = ({ query, dataAttib, onSeletedTypeName }: ContentProps) => {

    //Component state

    const [seletedTypeName, setSeletedTypeName] = useState<"name" | "type">("name")
    const [filter, setFilter] = useState<string>('')
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<itemInterface>({ name: '', id: 0 })
    const [dataQuery, setDataQuery] = useState<itemInterface[] | []>([])
    const [variables, setQueryOptions] = useState<queryOptionsInterface>({
        name: "",
        type: "",
        page: 1
    }
    )

    // Query execution
    const { loading, error, data } = useQuery(query, { variables })


    useEffect(() => {
        if (filter.length > 2) {
            setQueryOptions((currentState: queryOptionsInterface) => {
                return { ...currentState, [onSeletedTypeName]: filter, page: 1 }
            })
            setDataQuery([])
        }
        if (data && data[dataAttib] && data[dataAttib].results) {
            let itemList: itemInterface[] | [] = data[dataAttib].results
            if (dataQuery !== itemList) {
                setDataQuery(currentData => [...currentData, ...itemList])
            }
        }
    }, [data, filter])

    // State Handlers

    const resetSearch = () => {
        setFilter('')
        setQueryOptions((currentState: queryOptionsInterface) => {
            return { ...currentState, [onSeletedTypeName]: '', page: 1 }
        })
        setDataQuery([])
    }

    const handleFilter = (text: string) => {
        setFilter(text)
        if (text === "") {
            setQueryOptions((currentState: queryOptionsInterface) => {
                return { ...currentState, [onSeletedTypeName]: '', page: 1 }
            })
            setDataQuery([])
        }
    }

    const handleNextPage = () => {
        if (data && data[dataAttib] && data[dataAttib].info) {
            if (data[dataAttib].info.next !== null) {
                console.log(data[dataAttib].info.next)
                setQueryOptions((currentState: queryOptionsInterface) => {
                    return { ...currentState, page: data[dataAttib].info.next }
                })
            }
        }
    }

    const handleDetailsItem = () => {
        setModalVisible(currentState => !currentState)
    }

    const handleSelectedItem = (e: itemInterface) => {
        setSelectedItem(e)
        handleDetailsItem()
    }

    // List Item

    const renderItem = (elem: { item: itemInterface }) => (
        <Item elem={elem.item} onPress={() => handleSelectedItem(elem.item)} />
    )

    return (
        <View>
            <View style={styles.inputTextContainer} >
                <TextInput style={styles.inputText} placeholder="Ingrese busqueda.." onChangeText={handleFilter} value={filter} />
            </View>
            <SafeAreaView >
                {
                    error && dataQuery.length < 1 ?
                        <NotFoundScreen resetSearch={resetSearch} />
                        : dataQuery &&
                        <FlatList
                            onEndReached={handleNextPage}
                            style={styles.flatListContainer}
                            data={dataQuery}
                            renderItem={renderItem}
                            keyExtractor={(item: itemInterface) => item.id + item.name}
                        />
                }
                {loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                }


                <Modal presentationStyle='overFullScreen' visible={modalVisible}>
                    <View style={styles.modalContainer} >
                        <Button color="red" title="Back to results" onPress={handleDetailsItem} />
                        {selectedItem.image && <Image style={styles.modalImg} source={{ uri: selectedItem.image }} />}
                        <View >
                            <Text style={styles.itemTextTitle}>{selectedItem.name}</Text>
                        </View>
                        <View>
                            {selectedItem.type ? <Text>Type: {selectedItem.type}</Text> : null}
                            {selectedItem.air_date ? <Text>Release Date: {selectedItem.air_date}</Text> : null}
                            {selectedItem.gender ? <Text>Gender: {selectedItem.gender}</Text> : null}
                            {selectedItem.species ? <Text>Specie: {selectedItem.species}</Text> : null}
                            {selectedItem.dimension ? <Text>Dimension: {selectedItem.dimension}</Text> : null}
                            {selectedItem.episode ? <Text>Episode: {selectedItem.episode}</Text> : null}
                            {selectedItem.residents ?
                                <View style={{ width: '100%' }}>
                                    <Text>Characters:</Text>
                                    {selectedItem.residents.map((resident: { name: string, image: string }, i: number) => {
                                        if (i < 5) {
                                            return (
                                                <ItemContainer key={resident.name + 'residentItem' + i} style={styles.containerModal}>
                                                    <Image style={styles.imgContainerModal} source={{ uri: resident.image }} />
                                                    <Text style={styles.itemText}>{resident.name}</Text>
                                                </ItemContainer>
                                            )
                                        }
                                    })}
                                </View>
                                : null
                            }
                            {selectedItem.characters ? selectedItem.characters.map((character: { name: string, image: string }, i: number) => {
                                if (i < 5) {
                                    return (
                                        <ItemContainer key={character.name + 'charatcterItem' + i} style={styles.containerModal}>
                                            <Image style={styles.imgContainerModal} source={{ uri: character.image }} />
                                            <Text style={styles.itemText} >{character.name}</Text>
                                        </ItemContainer>
                                    )
                                }
                            })
                                : null
                            }
                        </View>

                    </View>
                </Modal>


            </SafeAreaView >
        </View>

    )
}

export default ContentHandler;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
        position: "relative"
    },
    image: {
        width: '30%',
        height: 100,
    },
    textImg: {
        flex: 1,
        flexWrap: "wrap",
        paddingLeft: 10,
        fontSize: 20,
        lineHeight: 50,
        textAlign: "center"
    },
    itemContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        margin: 10,
        borderWidth: 3
    },
    inputText: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    inputTextContainer: {
        elevation: 10,
        padding: 10,
        paddingTop: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    flatListContainer: {
        marginBottom: 150,

    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    modalContainer: {
        padding: 30,
        height: '100%'
    },
    modalImg: {
        marginTop: 15,
        width: '100%',
        height: 300,
    },
    itemTextTitle: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
        fontWeight: "bold"
    },
    itemText: {
        fontSize: 15
    },
    containerModal: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        borderWidth: 2,
        marginTop: 10,
        paddingLeft: 10
    },
    imgContainerModal: {
        marginRight: 10,
        marginTop: 15,
        width: '30%',
        height: 80,
    }
})