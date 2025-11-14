import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

type IoniconsProps = Omit<ComponentProps<typeof Ionicons>, 'name'>;
type EntypoProps = Omit<ComponentProps<typeof Entypo>, 'name'>;

export const AddIcon = ({ size = 24, color = 'black', ...props }: IoniconsProps) => (
    <Ionicons name="add-circle-outline" size={size} color={color} {...props} />
);

export const HomeIcon = ({ size = 24, color = 'black', ...props }: EntypoProps) => (
    <Entypo name="home" size={size} color={color} {...props} />
);

export const BoardIcon = ({ size = 24, color = 'black', ...props }: EntypoProps) => (
    <Entypo name="clipboard" size={size} color={color} {...props} />
);