import { ScrollView, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Shimmer from '@/components/ui/Shimmer';
import { banners, promotions } from '@/data/mockData';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#000' }}
      headerImage={
        banners[0] ? (
          <Shimmer style={styles.headerHero}>
            {/* Shimmer provides animated opacity; Image renders hero */}
          </Shimmer>
        ) : undefined
      }
    >
      <ThemedText>Seasonal picks and promotions</ThemedText>

      {/* Banners */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerRow}>
        {banners.map((b) => (
          <View key={b.id} style={styles.bannerCard}>
            <Shimmer style={styles.bannerImage} />
            <ThemedText type="subtitle">{b.title}</ThemedText>
            {b.subtitle ? <ThemedText>{b.subtitle}</ThemedText> : null}
          </View>
        ))}
      </ScrollView>

      {/* Promotions */}
      <ThemedView style={{ paddingHorizontal: 16 }}>
        <ThemedText type="subtitle">Promotions</ThemedText>
        {promotions.map((p) => (
          <View key={p.id} style={styles.promoRow}>
            <ThemedText>
              {p.title} {p.type === 'percentage' && p.value ? `- ${p.value}%` : ''}
            </ThemedText>
            {p.description ? <ThemedText>{p.description}</ThemedText> : null}
          </View>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerHero: {
    width: '100%',
    height: 240,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  bannerRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bannerCard: {
    width: 280,
    marginRight: 12,
  },
  bannerImage: {
    width: 280,
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  promoRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
});
