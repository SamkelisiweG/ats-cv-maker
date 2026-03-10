import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import PreviewScreen from './screens/PreviewScreen';
import TipsScreen from './screens/TipsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Form') iconName = 'create';
            else if (route.name === 'Preview') iconName = 'eye';
            else if (route.name === 'Tips') iconName = 'bulb';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Form" component={FormScreen} />
        <Tab.Screen name="Preview" component={PreviewScreen} />
        <Tab.Screen name="Tips" component={TipsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}