export interface PopulationKoOverride {
  title?: string;
  audience?: string;
  intro?: string;
  priorities?: { name: string; target: string; rationale: string }[];
  watchOuts?: string[];
}

export const specialPopulationsKo: Record<string, PopulationKoOverride> = {
  pregnancy: {
    title: '임신',
    audience: '임신·임신 준비 중',
    intro:
      '임신 중에는 철, 엽산, 콜린, 요오드, DHA가 더 많이 필요하지만 일부(레티놀, 수은이 많은 생선)는 제한해야 합니다. 2분기에는 약 +340kcal, 3분기에는 약 +450kcal을 추가합니다.',
    priorities: [
      { name: '엽산 (folic acid)', target: '600 mcg/일', rationale: '신경관 결손 위험 감소 — 임신 ≥1개월 전부터 시작.' },
      { name: '철', target: '27 mg/일', rationale: '혈액량이 약 50% 증가 — 결핍은 조산 위험과 관련.' },
      { name: 'DHA (오메가-3)', target: '≥ 200 mg/일', rationale: '태아 뇌·망막 발달에 핵심.' },
      { name: '콜린', target: '450 mg/일', rationale: '대부분의 임산부 비타민이 부족 — 계란·육류가 우수.' },
      { name: '요오드', target: '220 mcg/일', rationale: '태아 신경발달 — 요오드 첨가 소금 + 해산물.' },
      { name: '칼슘', target: '1,000 mg/일', rationale: '산모 골량을 유지하면서 태아 골격 형성 지원.' },
    ],
    watchOuts: [
      '알코올 섭취는 안전 한계가 없으므로 회피.',
      '수은이 높은 생선(황새치, 킹 고등어, 상어, 빅아이참치) 제한.',
      '날·덜 익은 고기·생선·계란, 비살균 유제품, 가열 안 한 델리미트 회피.',
      '레티놀(전구체) 보충 > 3,000 mcg/일은 기형 위험 — 베타카로틴은 안전.',
      '카페인 < 200 mg/일 (작은 커피 1잔) 이내.',
    ],
  },
  lactation: {
    title: '수유',
    audience: '모유 수유 중',
    intro:
      '모유 생산에 약 450–500kcal/일이 추가로 필요합니다. 수분, 요오드, DHA가 가장 부족하기 쉽습니다.',
    priorities: [
      { name: '에너지', target: '+450 kcal/일', rationale: '체중을 너무 빨리 잃지 않으면서 모유 공급 유지.' },
      { name: '수분', target: '하루 약 3.8 L', rationale: '갈증대로 마시고 매 수유 시 한 잔 추가.' },
      { name: '단백질', target: '약 1.3 g/kg/일', rationale: '조직 회복 + 모유 단백질 합성.' },
      { name: '요오드', target: '290 mcg/일', rationale: 'AAP는 150 mcg 요오드가 포함된 종합비타민 권장.' },
      { name: 'DHA', target: '≥ 200 mg/일', rationale: '모유로 직접 전달돼 영아 뇌 발달 지원.' },
      { name: '콜린', target: '550 mg/일', rationale: '모든 생애 단계 중 가장 높음.' },
    ],
    watchOuts: [
      '카페인이 모유로 이행 — < 300 mg/일, 영아 반응 관찰.',
      '음주는 제한. 한 잔이라도 ≥2시간 후 수유.',
      '수은이 높은 생선 회피 지속.',
    ],
  },
  seniors: {
    title: '노년 (65+)',
    audience: '건강한 노화',
    intro:
      '에너지 요구는 줄지만 단백질, 비타민 B12, 비타민 D 필요량은 늘어납니다. 30대에 시작되는 근감소(sarcopenia)는 60세 이후 가속 — 매끼 단백질과 저항운동을 권장.',
    priorities: [
      { name: '단백질', target: '1.0–1.2 g/kg/일', rationale: '0.8 RDA보다 높음 — 근육 유지·낙상 위험 감소.' },
      { name: '비타민 D', target: '20 mcg (800 IU)/일', rationale: '피부 합성 감소 — 뼈·면역 지원.' },
      { name: '비타민 B12', target: '2.4 mcg/일 (보충 권장)', rationale: '노년의 10–30%는 식품 B12 흡수가 떨어짐.' },
      { name: '칼슘', target: '1,200 mg/일', rationale: '나이로 인한 골 손실 대응.' },
      { name: '식이섬유', target: '21–30 g/일', rationale: '변비는 흔하며 식이가 큰 요인.' },
      { name: '수분', target: '약 2 L/일', rationale: '갈증 반응이 둔해져 탈수가 입원의 주 원인.' },
    ],
    watchOuts: [
      '고혈압 약 복용 시 나트륨 재평가.',
      '같은 양의 술도 더 강하게 작용 — 체수분 감소 영향.',
      '복합약물(PPI, 메트포민) 복용 시 B12·마그네슘 흡수 저하 가능.',
      '주 2–3회 저항 운동을 단백질과 함께 — 실제 근력으로 전환.',
    ],
  },
  athletes: {
    title: '운동·활동량 많은 성인',
    audience: '대부분 ≥ 1시간 훈련',
    intro:
      '에너지 가용성, 탄수화물 타이밍, 단백질 분배가 퍼포먼스를 결정합니다. 지구력·체형 종목에서 가장 흔한 실수는 저공급(under-fueling)입니다.',
    priorities: [
      { name: '에너지', target: '체중 × 33–55 kcal', rationale: '지구력·근력 운동은 상한 — 저공급은 RED-S 위험.' },
      { name: '단백질', target: '1.4–2.0 g/kg/일', rationale: '하루 3–5끼에 0.3 g/kg씩 분산, 운동 후 류신 강조.' },
      { name: '탄수화물 (훈련일)', target: '5–10 g/kg/일', rationale: '근글리코겐 보충으로 다음 세션 준비.' },
      { name: '수분', target: '훈련 전 5–10 ml/kg / 훈련 중 0.4–0.8 L/시간', rationale: '훈련 후 땀 손실의 1.25–1.5배 보충.' },
      { name: '철 (특히 여성)', target: '연 1회 페리틴 검사', rationale: '발 충격·땀 손실로 빈혈 없이도 페리틴 저하 가능.' },
      { name: '비타민 D', target: '≥ 20 mcg/일', rationale: '회복·면역·뼈 밀도와 관련.' },
    ],
    watchOuts: [
      '경기 전날 저탄수화물은 피할 것.',
      '카페인 3–6 mg/kg을 시합 약 45분 전 — 효과 입증. 9 mg/kg 초과는 위장 부담만 증가.',
      '크레아틴 모노하이드레이트(3–5 g/일)는 근력 종목에서 가장 근거가 강한 합법 보충제.',
      '60분 이상 발한 + 더위에서는 전해질 보충.',
    ],
  },
  vegan: {
    title: '비건·식물 기반',
    audience: '동물성 식품 미섭취',
    intro:
      '잘 계획된 식물 기반 식단은 모든 생애 단계에 적합합니다. 의식적으로 챙겨야 하는 4대 영양소: B12, 비타민 D, 오메가-3(EPA/DHA), 요오드.',
    priorities: [
      { name: '비타민 B12', target: '보충제 또는 강화식품 2.4 mcg/일', rationale: '강화되지 않은 식물에는 거의 없음 — 필수.' },
      { name: '비타민 D', target: '15–20 mcg/일', rationale: '지의류 유래 D2/D3 보충 + 강화 식물성 음료.' },
      { name: 'EPA + DHA', target: '약 250–500 mg/일', rationale: '조류 오일이 유일한 직접 식물성 — ALA 전환은 낮음.' },
      { name: '요오드', target: '150 mcg/일', rationale: '요오드 첨가 소금, 해초, 또는 보충제.' },
      { name: '비헴철', target: 'RDA의 1.8배', rationale: '식물성 철은 흡수가 낮음 — 비타민 C와 함께, 식사 중 커피·차 회피.' },
      { name: '아연', target: 'RDA + 약 50%', rationale: '피틴산이 흡수 저해 — 콩·곡물은 불리거나 발아.' },
      { name: '칼슘', target: '1,000 mg/일', rationale: '두부, 강화 식물성 음료, 케일, 청경채, 타히니, 칼슘 응고 콩.' },
      { name: '단백질', target: '1.0–1.1 g/kg/일', rationale: '하루 동안 곡물+콩을 조합해 완전 아미노산.' },
    ],
    watchOuts: [
      '강화 두유·완두유는 칼슘+B12+D를 가장 효율적으로 채우는 방법.',
      '쌀+콩 단일 의존을 피하고 다양한 단백질 공급원으로 아미노산을 보완.',
      '미국 외 지역에선 셀레늄이 부족할 수 있음 — 며칠에 한 번 브라질너트 1–2알.',
    ],
  },
  conditions: {
    title: '주요 만성질환',
    audience: '당뇨 · 고혈압 · 심혈관 · 만성 신장질환',
    intro:
      '항응고제, 혈압약, 인슐린 등을 복용 중이라면 식단 변경 전 의사·등록 영양사와 반드시 협력하세요.',
    priorities: [
      { name: '제2형 당뇨', target: '통곡물·콩·채소의 탄수화물, 첨가당 최소화', rationale: '지중해·DASH 식단이 A1c 개선. 탄수화물은 단백질·지방과 함께 섭취.' },
      { name: '고혈압', target: 'DASH 패턴, 나트륨 ≤ 2,300mg, 칼륨 3,500–4,700mg', rationale: '나트륨 감소 + DASH는 단일 약물 수준의 수축기 혈압 감소.' },
      { name: '심혈관 (ASCVD)', target: '포화지방 < 6% / 트랜스지방 0 / 주 2회 등푸른 생선', rationale: '식물 위주·저포화지방 식단은 LDL과 ASCVD 사건을 감소.' },
      { name: '만성 신장질환 (CKD)', target: '개인화 — 단백질·칼륨·인 모두 조정', rationale: '신장 전문 영양사와 협력. "건강식"(바나나·콩 등)도 제한이 필요할 수 있음.' },
    ],
    watchOuts: [
      '자몽은 스타틴, 칼슘 채널 차단제 등 다수 약물과 상호작용.',
      '와파린 환자는 비타민 K(잎채소)를 일정량으로 유지 — 회피가 아닌 일관성.',
      'GLP-1 작용제는 위 배출이 느려짐 — 단백질 위주 소량 식사가 메스꺼움 감소.',
    ],
  },
};
