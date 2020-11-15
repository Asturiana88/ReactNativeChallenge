import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql'
import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotFoundScreen from '../screens/NotFoundScreen';
import { View, Text, ItemContainer, TextInput, Modal } from './Themed';

interface entityProps {
    id: number,
    name: string,
    type?: string,
    gender?: string,
    species?: string,
    image?: string,
    dimension?: string,
    residents?: [{
        id?: number,
        name: string,
        image: string
    }],
    episode?: string,
    air_date?: string,
    characters?: [{
        id?: number,
        name: string,
        image: string
    }]
}

interface Props {
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

interface listEntityItemProps { entity: entityProps, onPress: () => void }
const EntityItem = ({ entity, onPress }: listEntityItemProps) => (
    <TouchableOpacity onPress={onPress}>
        <ItemContainer style={styles.itemContainer}>
            {entity.image && <Image style={styles.image} source={{ uri: entity.image }} />}
            <Text style={styles.textImg}> {entity.name} </Text>
        </ItemContainer>
    </TouchableOpacity>

)

const ContentHandler = ({ query, dataAttib, onSeletedTypeName }: Props) => {

    //Component state

    const [seletedTypeName, setSeletedTypeName] = useState<"name" | "type">("name")
    const [filter, setFilter] = useState<string>('')
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [selectedEntity, setSelectedEntity] = useState<entityProps>({ name: '', id: 0 })
    const [dataQuery, setDataQuery] = useState<entityProps[] | []>([])
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
            setQueryOptions((currentState: queryOptionsInterface) => (
                { ...currentState, [onSeletedTypeName]: filter, page: 1 }
            ))
            setDataQuery([])
        }
        if (data && data[dataAttib] && data[dataAttib].results) {
            let itemList: entityProps[] | [] = data[dataAttib].results
            if (dataQuery !== itemList) {
                setDataQuery(currentData => [...currentData, ...itemList])
            }
        }
    }, [data, filter])

    // State Handlers

    const resetSearch = () => {
        setFilter('')
        setDataQuery([])
        setQueryOptions((currentState: queryOptionsInterface) => (
            { ...currentState, [onSeletedTypeName]: '', page: 1 }
        ))
    }

    const handleFilter = (text: string) => {
        setFilter(text)
        if (text === "") {
            setDataQuery([])
            setQueryOptions((currentState: queryOptionsInterface) => (
                { ...currentState, [onSeletedTypeName]: '', page: 1 }
            ))
        }
    }

    const handleNextPage = () => {
        if (data && data[dataAttib] && data[dataAttib].info) {
            if (data[dataAttib].info.next !== null) {
                setQueryOptions((currentState: queryOptionsInterface) => (
                    { ...currentState, page: data[dataAttib].info.next }
                ))
            }
        }
    }

    const handleDetailsEntity = () => {
        setModalVisibility(currentState => !currentState)
    }

    const handleSelectedEntity = (e: entityProps) => {
        setSelectedEntity(e)
        handleDetailsEntity()
    }

    // List Item

    const renderItem = (entity: { item: entityProps }) => (
        <EntityItem entity={entity.item} onPress={() => handleSelectedEntity(entity.item)} />
    )

    const renderFirstFiveChars = (characters: { name: string, image: string }[]) => {
        if (characters.length > 0 && characters[0].name) {
            return characters.map((resident: { name: string, image: string }, i: number) => {
                if (i < 5) {
                    return (
                        <ItemContainer key={`${resident.name} residentItem ${i}`} style={styles.containerModal}>
                            <Image style={styles.imgContainerModal} source={{ uri: resident.image }} />
                            <Text style={styles.itemText}>{resident.name}</Text>
                        </ItemContainer>
                    )
                }
            })
        }
        return (
            <Text>No Characters found</Text>
        )
    }

    const renderEntityDetails = () => {
        if (selectedEntity.dimension && selectedEntity.residents) {
            return (
                <View>
                    <Text>Type: {selectedEntity.type}</Text>
                    <Text>Dimension: {selectedEntity.dimension}</Text>
                    <View style={{ width: '100%' }}>
                        <Text>Residents:</Text>
                        {renderFirstFiveChars(selectedEntity.residents)}
                    </View>
                </View>
            )
        } else if (selectedEntity.air_date && selectedEntity.characters) {
            return (
                <View>
                    <Text>Release Date: {selectedEntity.air_date} </Text>
                    <Text>Episode: {selectedEntity.episode}</Text>
                    <Text>Characters:</Text>
                    {renderFirstFiveChars(selectedEntity.characters)}
                </View>
            )
        }
        return (
            <View>
                <Text>Type: {selectedEntity.type || " - "}</Text>
                <Text>Gender: {selectedEntity.gender}</Text>
                <Text>Specie: {selectedEntity.species}</Text>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.inputTextContainer} >
                <TextInput style={styles.inputText} placeholder="Search..." onChangeText={handleFilter} value={filter} />
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
                            keyExtractor={(item: entityProps) => `${item.id}`}
                        />
                }
                {loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                }


                <Modal presentationStyle='overFullScreen' visible={modalVisibility}>
                    <View style={styles.modalContainer} >
                        <Button color="red" title="Back to results" onPress={handleDetailsEntity} />
                        {selectedEntity.image && <Image style={styles.modalImg} source={{ uri: selectedEntity.image }} />}
                        <View >
                            <Text style={styles.itemTextTitle}>{selectedEntity.name}</Text>
                        </View>
                        {renderEntityDetails()}
                    </View>
                </Modal>


            </SafeAreaView >
        </View >

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