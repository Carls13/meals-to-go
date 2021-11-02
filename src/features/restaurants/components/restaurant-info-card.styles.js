import { Card as PaperCard } from 'react-native-paper';
import styled from 'styled-components/native';

export const Card = styled(PaperCard)`
    background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Cover = styled(PaperCard.Cover)`
    background-color: ${(props) => props.theme.colors.bg.primary};;
    padding: ${(props) => props.theme.space[3]};
`;

export const Address = styled.Text`
    font-size: ${(props) => props.theme.fontSizes.caption};
    font-family: ${(props) => props.theme.fonts.body};
`;

export const Info = styled.View`
    padding: ${(props) => props.theme.space[3]};
`;

export const Rating = styled.View`
    flex-direction: row;
    margin-top: ${(props) => props.theme.space[2]};
    margin-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const SectionEnd = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const Icon = styled.Image`
    width: 20;
    height: 20;
`;