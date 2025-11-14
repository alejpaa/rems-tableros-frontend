import type { PropsWithChildren } from 'react';
import type { Edge, SafeAreaViewProps } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<SafeAreaViewProps>;

const DEFAULT_EDGES: Edge[] = ['top', 'right', 'bottom', 'left'];
const BASE_CLASSNAME = 'flex-1 bg-background px-6 pt-8';

export function Screen({ children, className, edges = DEFAULT_EDGES, ...viewProps }: ScreenProps) {
    const combinedClassName = [BASE_CLASSNAME, className].filter(Boolean).join(' ');

    return (
        <SafeAreaView className={combinedClassName} edges={edges} {...viewProps}>
            {children}
        </SafeAreaView>
    );
}