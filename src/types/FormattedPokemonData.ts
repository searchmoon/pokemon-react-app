export interface FormattedPokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  previous: string | undefined; // 첫번째 포켓몬의 previous, next가 없기 때문에 undefined가 올수 있는것을 고려
  next: string | undefined;
  abilities: string[];
  stats: Stat[];
  DamageRelations: DamageRelation[];
  types: string[];
  sprites: string[];
  description: string;
}

export interface DamageRelation {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageFrom[];
  half_damage_from: DoubleDamageFrom[];
  half_damage_to: DoubleDamageFrom[];
  no_damage_from: any[];
  no_damage_to: DoubleDamageFrom[];
}

export interface DoubleDamageFrom {
  name: string;
  url: string;
}

export interface Stat {
  name: string;
  baseStat: number;
}
