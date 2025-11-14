import { ProfileCard } from '@/components/profile-card';
import { Screen } from '@/components/Screen';
import { View } from 'react-native';
import './../global.css';

interface CandidateData {
  name: string;
  email: string;
  description: string;
};

export default function HomeScreen() {
  const candidate: CandidateData = {
    name: "Alejandro Padilla Arellano",
    email: "alejandro.padillaa00@gmail.com",
    description: "Breve descripción profesional. Desarrollador con experiencia en React y soluciones móviles, enfocado en la usabilidad y el diseño limpio."
  };
  return (
    <Screen>
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ProfileCard
          name={candidate.name}
          email={candidate.email}
          description={candidate.description}
        />
      </View>
    </Screen>
  );
}
