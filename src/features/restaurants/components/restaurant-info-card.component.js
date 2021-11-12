import React from "react";

import { Image } from "react-native";
import { Favourite } from "../../../components/favourites/favourite.component";
import { Text } from "../../../components/typography/text.component";
import { Address, Card, Cover, Icon, Info, Rating, Section, SectionEnd } from "./restaurant-info-card.styles";

const STAR_URL = "https://toppng.com/uploads/preview/5-point-stars-png-star-icon-flat-11562958768wpf63hu4tq.png";

const OPEN_URL = "https://png.pngtree.com/png-clipart/20190614/original/pngtree-open-line-black-icon-png-image_3767669.jpg";

export const RestaurantInfoCard = ({ restaurant }) => {
    const {
        name,
        icon,
        photos,
        address,
        isOpenNow,
        rating,
        isClosedTemporarily,
        placeId
    } = restaurant;

    const ratingArray = Array.from(new Array(Math.floor(rating)));

    return (
        <Card elevation={5}>
            <Favourite restaurant={restaurant} />
            <Cover source={{ uri: photos[0] }} key={name} />
            <Info>
                <Text variant="label">{name}</Text>
                <Section>
                    <Rating>
                        {
                            ratingArray.map((_, i) => {
                                return <Icon key={`star-${placeId}-${i}`} source={{ uri: STAR_URL }} />
                            })
                        }
                    </Rating>
                    <SectionEnd>
                        {
                            isClosedTemporarily && (
                                <Text variant="error">
                                    CLOSED TEMPORARILY
                                </Text>
                            )
                        }
                        {isOpenNow && <Icon source={{ uri: OPEN_URL }} />}
                        <Image style={{ width: 20, height: 20 }} source={{ uri: icon }} />
                    </SectionEnd>
                </Section>
                <Address>{address}</Address>
            </Info>
        </Card>
    );
};