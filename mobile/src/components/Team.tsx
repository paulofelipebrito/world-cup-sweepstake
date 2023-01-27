import { HStack } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  teamPoints: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
}

export function Team({ code, position, onChangeText, teamPoints }: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}
      <Input
        placeholder={teamPoints}
        w="12"
        h="9"
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        editable={!teamPoints}
      />
      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
