import React from 'react';
import {View, StyleSheet} from 'react-native';
import GradientIcon from './GradientIcon';
import {COLORS} from '../theme/theme';
import ProfilePhoto from './ProfilePhoto';

function HeaderBar() {
  return (
    <View style={styles.headerBar}>
      <GradientIcon
        name="view-grid"
        size={20}
        color={COLORS.primaryLightGreyHex}
      />
      <ProfilePhoto />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HeaderBar;
