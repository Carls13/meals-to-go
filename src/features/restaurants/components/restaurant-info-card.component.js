import React from "react";
import { Card as PaperCard } from 'react-native-paper';
import styled from 'styled-components/native';

const Card = styled(PaperCard)`
    background-color: ${(props) => props.theme.colors.bg.primary};;
`;
const Cover = styled(PaperCard.Cover)`
    background-color: ${(props) => props.theme.colors.bg.primary};;
    padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {
    const {
        name = "Some Resturant",
        icon,
        photos = [
            "https://upload.wikimedia.org/wikipedia/commons/e/ef/Restaurant_N%C3%A4sinneula.jpg"
        ],
        address = "100 some random street",
        isOpenNow = true,
        rating = 4,
        isClosedTemporarily = false,
    } = restaurant;

    return (
        <Card elevation={5}>
            <Cover source={{ uri: photos[0] }} key={name} />
            <PaperCard.Title title={name} subtitle={address} />
            {/* <Text>{name}</Text> */}
        </Card>
    );
};