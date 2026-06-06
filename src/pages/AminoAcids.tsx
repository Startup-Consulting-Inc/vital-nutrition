import { useState, useEffect, useCallback, useMemo } from 'react';
import { aminoAcids, type AminoAcid } from '@/data/aminoAcids';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useT, useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const categoryLabels: Record<string, { label: string; color: string; bg: string }> = {
  'nonpolar': { label: 'Nonpolar', color: '#c9a96e', bg: '#c9a96e10' },
  'polar': { label: 'Polar', color: '#4a90a4', bg: '#4a90a410' },
  'aromatic': { label: 'Aromatic', color: '#6b7d76', bg: '#6b7d7610' },
  'positively-charged': { label: 'Basic (+)', color: '#4a7c59', bg: '#4a7c5910' },
  'negatively-charged': { label: 'Acidic (-)', color: '#d95c39', bg: '#d95c3910' },
};

export function getCategoryLabel(category: string, locale: string): string {
  const labels: Record<string, string> = locale === 'ko' ? {
    'nonpolar': '비극성',
    'polar': '극성',
    'aromatic': '방향족',
    'positively-charged': '염기성 (+)',
    'negatively-charged': '산성 (-)',
  } : {
    'nonpolar': 'Nonpolar',
    'polar': 'Polar',
    'aromatic': 'Aromatic',
    'positively-charged': 'Basic (+)',
    'negatively-charged': 'Acidic (-)',
  };
  return labels[category] || category;
}

export const aminoAcidsKoMap: Record<string, {
  name: string;
  functions: string[];
  foodSources: string[];
  deficiencyEffects: string[];
  dailyNeed?: string;
}> = {
  'Histidine': {
    name: '히스티딘',
    functions: [
      '히스타민의 전구체로서 면역 반응에 관여',
      '신경 세포를 보호하는 미엘린 초장 유지',
      '신체 성장 및 조직 수리에 필수적',
      '아연 및 철분의 흡수 지원',
    ],
    foodSources: ['쇠고기', '돼지고기', '닭고기', '생선', '두부', '콩류', '렌틸콩', '통곡물'],
    deficiencyEffects: ['면역 기능 저하', '인지 기능 장애', '영유아 청력 손실 위험'],
  },
  'Isoleucine': {
    name: '이소류신',
    functions: [
      '근육 대사를 위한 분지사슬 아미노산(BCAA)',
      '혈당 및 에너지 수치 조절',
      '헤모글로빈 형성 지원',
      '운동 후 근육 회복 지원',
    ],
    foodSources: ['계란', '생선', '닭고기', '대두', '치즈', '견과류', '씨앗류', '콩류'],
    deficiencyEffects: ['근육 약화', '저혈당증', '몸의 떨림 현상'],
    dailyNeed: '체중 1kg당 19-20 mg',
  },
  'Leucine': {
    name: '류신',
    functions: [
      '근육 단백질 합성을 촉진하는 핵심 BCAA',
      '혈당 조절 및 인슐린 기능 지원',
      '뼈 조직의 성장 및 수리 지원',
      '상처 치유 및 신체 회복 촉진',
    ],
    foodSources: ['닭가슴살', '쇠고기', '생선', '계란', '대두 단백질', '유제품', '호박씨', '땅콩'],
    deficiencyEffects: ['근육 성장 부진', '상처 치유 지연', '근손실(근위축)'],
    dailyNeed: '체중 1kg당 39-42 mg',
  },
  'Lysine': {
    name: '라이신',
    functions: [
      '단백질 합성 및 콜라겐 형성에 필수적',
      '칼슘 흡수 지원 및 뼈 건강 증진',
      '카르니틴 생성(지방 대사)에 필수적',
      '면역 기능 및 항체 생성 역할 수행',
    ],
    foodSources: ['적색육', '돼지고기', '닭고기', '생선', '계란', '치즈', '대두', '퀴노아', '렌틸콩'],
    deficiencyEffects: ['피로', '빈혈', '성장 부진', '식욕 감퇴'],
    dailyNeed: '체중 1kg당 30-38 mg',
  },
  'Methionine': {
    name: '메티오닌',
    functions: [
      '시스테인의 전구체 (황 전환 경로)',
      '메틸화 반응 및 DNA 발현에 중요',
      '중금속 해독 작용 지원',
      '피부 탄력 유지 및 손발톱 강화',
    ],
    foodSources: ['계란', '생선', '쇠고기', '닭고기', '돼지고기', '브라질너트', '참깨', '대두'],
    deficiencyEffects: ['지방간', '피부 및 손발톱 건강 악화', '호모시스테인 수치 상승'],
    dailyNeed: '체중 1kg당 10.4 mg',
  },
  'Phenylalanine': {
    name: '페닐알라닌',
    functions: [
      '티로신, 도파민, 노르에피네프린, 에피네프린의 전구체',
      '멜라닌 색소 생성에 필요',
      '뇌 신경 신호 전달 및 기분 조절 지원',
      '갑상선 호르몬 합성 가능하게 함',
    ],
    foodSources: ['쇠고기', '닭고기', '생선', '계란', '치즈', '우유', '대두', '호박씨'],
    deficiencyEffects: ['우울감', '인지 기능 장애', '갑상선 기능 저하 증상'],
    dailyNeed: '체중 1kg당 25-33 mg',
  },
  'Threonine': {
    name: '트레오닌',
    functions: [
      '구조 단백질(콜라겐 및 엘라스틴)의 주요 구성 성분',
      '지방 대사 및 간 기능 지원',
      '면역 기능(항체 형성)에 관여',
      '치아 에나멜질 및 피부 건강 유지',
    ],
    foodSources: ['살코기 쇠고기', '닭고기', '양고기', '돼지고기', '치즈', '렌틸콩', '참깨', '대두'],
    deficiencyEffects: ['근육 떨림', '지방간', '과민증', '피부 건강 악화'],
    dailyNeed: '체중 1kg당 15-20 mg',
  },
  'Tryptophan': {
    name: '트립토판',
    functions: [
      '세로토닌(기분 조절) 및 멜라토닌(수면)의 전구체',
      '체내 니아신(비타민 B3) 생성 지원',
      '식욕 및 수면 주기 조절 지원',
      '통증 인지 및 스트레스 반응 관여',
    ],
    foodSources: ['칠면조', '닭고기', '계란', '치즈', '생선', '우유', '호박씨', '두부', '귀리'],
    deficiencyEffects: ['불면증', '우울증', '불안증', '통증 내성 감소'],
    dailyNeed: '체중 1kg당 4-5 mg',
  },
  'Valine': {
    name: '발린',
    functions: [
      '근육 성장, 조직 수리 및 에너지 생성을 위한 BCAA',
      '류신과 함께 근육 단백질 합성 촉진',
      '체내 질소 균형 유지',
      '정신적 집중 및 운동 협응력 유지',
    ],
    foodSources: ['쇠고기', '닭고기', '생선', '계란', '유제품', '대두', '땅콩', '버섯'],
    deficiencyEffects: ['근손실', '운동 협응력 장애', '불면증', '정신적 피로'],
    dailyNeed: '체중 1kg당 24-26 mg',
  },
  'Alanine': {
    name: '알라닌',
    functions: [
      '포도당 생성(포도당 신생합성)의 주요 아미노산',
      '면역 체계 기능 지원',
      '유기산 대사 지원',
      '운동 시 근육에 에너지 공급',
    ],
    foodSources: ['쇠고기', '생선', '가금류', '계란', '유제품', '콩류', '견과류', '씨앗류'],
    deficiencyEffects: ['드묾 — 체내에서 충분히 합성됨'],
  },
  'Arginine': {
    name: '아르기닌',
    functions: [
      '산화질소(혈관 확장, 혈류 개선)의 전구체',
      '상처 치유 및 면역 기능 지원',
      '성장 호르몬 분비 촉진',
      '단백질 분해로 발생하는 암모니아 해독',
    ],
    foodSources: ['칠면조', '닭고기', '돼지고기', '대두', '호박씨', '땅콩', '병아리콩', '유제품'],
    deficiencyEffects: ['상처 치유 지연', '혈압 상승', '발기력 저하'],
  },
  'Asparagine': {
    name: '아스파라긴',
    functions: [
      '단백질 합성 및 아미노산 대사에 중요',
      '신경계 발달 및 기능 지원',
      '당단백질 합성에 필수적',
      '체내 암모니아 제거 지원',
    ],
    foodSources: ['쇠고기', '가금류', '생선', '계란', '유제품', '아스파라거스', '감자', '견과류', '콩류'],
    deficiencyEffects: ['드묾 — 아스파르트산으로부터 체내 합성됨'],
  },
  'Aspartic Acid': {
    name: '아스파르트산',
    functions: [
      '호르몬 생성 및 분비에 관여',
      '뇌 내 신경 전달 물질 기능 지원',
      '요소 회로(암모니아 제거)의 핵심 역할',
      '항체 생성 지원을 통한 면역 기능 보강',
    ],
    foodSources: ['굴', '소시지', '생선', '쇠고기', '가금류', '계란', '새싹 씨앗', '콩류'],
    deficiencyEffects: ['드묾 — 체내에서 충분히 합성됨'],
  },
  'Cysteine': {
    name: '시스테인',
    functions: [
      '체내 마스터 항산화제인 글루타치온의 전구체',
      '단백질 합성 및 해독 작용에 필수적',
      '피부 건강 지원 (콜라겐 가교 결합)',
      '철분 및 아연 대사 지원',
    ],
    foodSources: ['돼지고기', '닭고기', '칠면조', '계란', '유청 단백질', '요거트', '해바라기씨', '콩류'],
    deficiencyEffects: ['항산화 방어 능력 저하', '모발 및 손발톱 약화', '해독 능력 저하'],
  },
  'Glutamic Acid': {
    name: '글루탐산',
    functions: [
      '뇌에서 가장 풍부한 흥분성 신경 전달 물질',
      '단백질 대사의 핵심 역할',
      '면역 기능 및 장 건강 지원',
      '진정 신경 전달 물질인 GABA의 전구체',
    ],
    foodSources: ['치즈 (파르메산)', '간장', '액젓', '육류', '가금류', '계란', '토마토', '버섯'],
    deficiencyEffects: ['드묾 — 식단 및 체내에서 가장 풍부한 아미노산'],
  },
  'Glutamine': {
    name: '글루타민',
    functions: [
      '체내에서 가장 풍부한 유리 아미노산',
      '장 세포 및 면역 세포의 핵심 에너지원',
      '고강도 운동 후 근육 회복 지원',
      '신장의 산-염기 균형 유지',
    ],
    foodSources: ['쇠고기', '닭고기', '생선', '계란', '유제품', '양배추', '콩류', '비트'],
    deficiencyEffects: ['장 장벽 기능 약화', '질병 시 근손실', '면역력 약화'],
  },
  'Glycine': {
    name: '글리신',
    functions: [
      '콜라겐의 주요 구성 성분 (콜라겐 단백질의 1/3)',
      '억제성 신경 전달 물질로서 중추 신경계 지원',
      '지방 소화를 돕는 담즙산 생성 조절',
      '에너지 저장을 위한 크레아틴 합성에 관여',
    ],
    foodSources: ['젤라틴', '돼지 껍데기', '닭 껍질', '생선', '콩류', '시금치', '양배추', '단호박'],
    deficiencyEffects: ['피부 탄력 저하', '상처 회복 지연', '수면 장애'],
  },
  'Proline': {
    name: '프롤린',
    functions: [
      '콜라겐 구조 및 관절 건강에 필수적',
      '피부 탄력 및 상처 치유 지원',
      '동맥 벽 콜라겐 유지를 통한 심혈관 건강 지원',
      '연골 복구 및 유지 지원',
    ],
    foodSources: ['젤라틴', '쇠고기', '양고기', '닭고기', '생선', '양배추', '아스파라거스', '메밀', '아몬드'],
    deficiencyEffects: ['관절 통증', '상처 치유 지연', '피부 및 혈관 약화'],
  },
  'Serine': {
    name: '세린',
    functions: [
      '세포막 형성을 위한 인지질 합성에 필요',
      '뇌 기능 및 신경 전달 물질 생성 지원',
      'DNA 및 RNA 합성에 관여',
      '근육 형성 및 면역 기능 역할',
    ],
    foodSources: ['계란', '생선', '쇠고기', '닭고기', '돼지고기', '대두', '견과류', '씨앗류', '콩류'],
    deficiencyEffects: ['드묾 — 글리신으로부터 체내 합성됨'],
  },
  'Tyrosine': {
    name: '티로신',
    functions: [
      '도파민, 노르에피네프린, 아드레날린의 전구체',
      '갑상선 호르몬(T3 및 T4) 생성에 필요',
      '피부 및 모발의 멜라닌 색소 생성에 필요',
      '스트레스 상황에서 인지 기능 향상',
    ],
    foodSources: ['닭고기', '칠면조', '생선', '우유', '치즈', '요거트', '호박씨', '땅콩', '대두'],
    deficiencyEffects: ['갑상선 기능 저하', '우울감', '스트레스 내성 감소'],
  },
};

export function localizeAminoAcid(acid: AminoAcid, locale: string): AminoAcid {
  if (locale !== 'ko') return acid;
  const ko = aminoAcidsKoMap[acid.name];
  if (!ko) return acid;
  return {
    ...acid,
    name: ko.name,
    functions: ko.functions,
    foodSources: ko.foodSources,
    deficiencyEffects: ko.deficiencyEffects,
    dailyNeed: ko.dailyNeed || acid.dailyNeed,
  };
}

function AcidCard({ acid, onClick }: { acid: AminoAcid; onClick: (acid: AminoAcid) => void }) {
  const [locale] = useLocale();
  const cat = categoryLabels[acid.category];
  const catLabel = getCategoryLabel(acid.category, locale);
  return (
    <button
      onClick={() => onClick(acid)}
      className="rounded-2xl border p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-left w-full"
      style={{
        backgroundColor: '#ffffff',
        borderColor: acid.essential ? 'rgba(74, 124, 89, 0.2)' : 'rgba(32, 42, 38, 0.06)',
        borderLeftWidth: acid.essential ? '4px' : '1px',
        borderLeftColor: acid.essential ? '#4a7c59' : undefined,
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: acid.essential ? '#4a7c59' : '#6b7d76' }}
          >
            {acid.abbreviation1}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-deep">{acid.name}</h3>
              {acid.essential && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4a7c59] text-white">
                  {locale === 'ko' ? '필수' : 'Essential'}
                </span>
              )}
            </div>
            <span className="text-xs text-deep/40 font-mono">{acid.abbreviation3} — {acid.abbreviation1}</span>
          </div>
        </div>
        <span
          className="text-[10px] px-2 py-1 rounded-full font-medium flex-shrink-0"
          style={{ backgroundColor: cat.bg, color: cat.color }}
        >
          {catLabel}
        </span>
      </div>

      {/* Functions */}
      <div className="space-y-1.5 mb-3">
        {acid.functions.slice(0, 2).map((fn, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-deep/20 flex-shrink-0 mt-1.5" />
            <span className="text-xs text-deep/60 leading-relaxed">{fn}</span>
          </div>
        ))}
      </div>

      {/* Food sources */}
      <div className="flex flex-wrap gap-1">
        {acid.foodSources.slice(0, 4).map(src => (
          <span key={src} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-deep/50">
            {src}
          </span>
        ))}
        {acid.foodSources.length > 4 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-deep/30">+{acid.foodSources.length - 4}</span>
        )}
      </div>

      {/* Daily need for essential */}
      {acid.essential && acid.dailyNeed && (
        <div className="mt-3 pt-3 border-t border-deep/5">
          <span className="text-[10px] text-deep/30">RDA: {acid.dailyNeed}</span>
        </div>
      )}
    </button>
  );
}

export default function AminoAcids() {
  const t = useT();
  const [locale] = useLocale();
  const [selectedAcid, setSelectedAcid] = useState<AminoAcid | null>(null);

  const localizedAminoAcids = useMemo(() => {
    return aminoAcids.map(a => localizeAminoAcid(a, locale));
  }, [locale]);
  const localizedEssentials = useMemo(() => {
    return localizedAminoAcids.filter(a => a.essential);
  }, [localizedAminoAcids]);
  const localizedNonEssentials = useMemo(() => {
    return localizedAminoAcids.filter(a => !a.essential);
  }, [localizedAminoAcids]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = useCallback((acid: AminoAcid) => {
    setSelectedAcid(acid);
    setDialogOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    setTimeout(() => setSelectedAcid(null), 200);
  }, []);

  // Close dialog on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return (
    <section className="w-full py-24 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead titleKey="aa.h1" descriptionKey="aa.subtitle" path="/amino-acids" type="article" dateModified="2026-05-30" breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Amino Acids', path: '/amino-acids' }]} />
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <p className="text-caption text-terracotta mb-4">{t('aa.eyebrow')}</p>
          <h1
            className="text-deep mb-4"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            {t('aa.h1')}
          </h1>
          <p className="text-lg text-deep/60 max-w-2xl mx-auto mb-6">
            {t('aa.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4a7c59]" />
              <span className="text-deep/60">{t('aa.essentialBadge')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6b7d76]" />
              <span className="text-deep/60">{t('aa.nonEssentialBadge')}</span>
            </div>
          </div>
        </header>

        {/* Essential Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#4a7c59]" />
            <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('aa.essentialH2')}
            </h2>
            <span className="text-xs text-deep/30">{t('aa.essentialNote')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localizedEssentials.map((acid) => (
              <AcidCard key={acid.name} acid={acid} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* Non-Essential Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#6b7d76]" />
            <h2 className="text-xl text-deep" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('aa.nonEssentialH2')}
            </h2>
            <span className="text-xs text-deep/30">{t('aa.nonEssentialNote')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {localizedNonEssentials.map((acid) => (
              <AcidCard key={acid.name} acid={acid} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* Summary Table */}
        <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
          <h2 className="text-lg text-deep mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('aa.tableTitle')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-deep/10">
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">#</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '이름' : 'Name'}</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '약어' : 'Code'}</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '분류' : 'Type'}</th>
                  <th className="text-left py-2 pr-4 text-caption text-deep/40">{locale === 'ko' ? '필수 여부' : 'Essential'}</th>
                  <th className="text-left py-2 text-caption text-deep/40">{locale === 'ko' ? '주요 기능' : 'Key Function'}</th>
                </tr>
              </thead>
              <tbody>
                {localizedAminoAcids.map((acid, i) => (
                  <tr
                    key={acid.name}
                    className="border-b border-deep/5 hover:bg-[#f6f5f1] transition-colors"
                  >
                    <td className="py-2 pr-4 text-deep/30 font-mono text-xs">{i + 1}</td>
                    <td className="py-2 pr-4 font-medium text-deep">{acid.name}</td>
                    <td className="py-2 pr-4 font-mono text-deep/50 text-xs">{acid.abbreviation3} ({acid.abbreviation1})</td>
                    <td className="py-2 pr-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: categoryLabels[acid.category]?.bg, color: categoryLabels[acid.category]?.color }}>
                        {getCategoryLabel(acid.category, locale)}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      {acid.essential ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4a7c59] text-white font-bold">{locale === 'ko' ? '필수' : 'YES'}</span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-deep/5 text-deep/30">{locale === 'ko' ? '비필수' : 'No'}</span>
                      )}
                    </td>
                    <td className="py-2 text-deep/50 text-xs max-w-[200px] truncate">{acid.functions[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BCAA + practical meal example calculator */}
        <BcaaCalculator />

        {/* Complete proteins matchmaker */}
        <CompleteProteinMatchmaker />

        {/* Complete vs. Incomplete Proteins */}
        <CompleteVsIncomplete locale={locale} />

        {/* Acid Detail Dialog */}
        <AcidDetailDialog acid={selectedAcid} open={dialogOpen} onClose={handleClose} />

        <p className="text-[10px] text-deep/40 mt-4">
          {locale === 'ko' ? '최종 업데이트: 2026년 5월 30일' : 'Last updated: May 30, 2026'}
        </p>
      </div>
    </section>
  );
}

// === BCAA Calculator (practical meal example) ===
// Targets follow WHO/FAO 2007 amino-acid scoring patterns.
const BCAA_TARGETS_MG_PER_KG = { leucine: 39, isoleucine: 20, valine: 26 };

interface BcaaFood {
  name: string;
  serving: string;
  /** mg of leucine, isoleucine, valine per serving (USDA SR-Legacy). */
  leu: number; ile: number; val: number;
  protein: number;
}

const BCAA_FOODS: BcaaFood[] = [
  { name: 'Chicken breast (3 oz)', serving: '85 g cooked', leu: 1990, ile: 1100, val: 1180, protein: 26 },
  { name: 'Greek yogurt (1 cup)',  serving: '227 g',       leu: 2080, ile: 1140, val: 1500, protein: 22 },
  { name: 'Salmon (3 oz)',         serving: '85 g cooked', leu: 1750, ile: 1010, val: 1110, protein: 22 },
  { name: 'Eggs (2 large)',        serving: '100 g',       leu: 1090, ile: 670,  val: 870,  protein: 12 },
  { name: 'Lentils (1 cup)',       serving: '198 g cooked',leu: 1300, ile: 770,  val: 890,  protein: 18 },
  { name: 'Tofu (1/2 cup)',        serving: '126 g',       leu: 770,  ile: 470,  val: 510,  protein: 10 },
  { name: 'Quinoa (1 cup)',        serving: '185 g cooked',leu: 530,  ile: 290,  val: 350,  protein: 8 },
  { name: 'Whey protein (1 scoop)',serving: '30 g',        leu: 2700, ile: 1500, val: 1430, protein: 24 },
];

const BCAA_FOODS_KO: Record<string, { name: string; serving: string }> = {
  'Chicken breast (3 oz)': { name: '닭가슴살 (3 oz)', serving: '조리됨 85g' },
  'Greek yogurt (1 cup)': { name: '그릭 요거트 (1컵)', serving: '227g' },
  'Salmon (3 oz)': { name: '연어 (3 oz)', serving: '조리됨 85g' },
  'Eggs (2 large)': { name: '계란 (대란 2개)', serving: '100g' },
  'Lentils (1 cup)': { name: '렌틸콩 (1컵)', serving: '조리됨 198g' },
  'Tofu (1/2 cup)': { name: '두부 (1/2컵)', serving: '126g' },
  'Quinoa (1 cup)': { name: '퀴노아 (1컵)', serving: '조리됨 185g' },
  'Whey protein (1 scoop)': { name: '유청 단백질 (1스쿱)', serving: '30g' },
};

function BcaaCalculator() {
  const [profile] = useUserProfile();
  const [picked, setPicked] = useState<string[]>(['Chicken breast (3 oz)', 'Greek yogurt (1 cup)']);
  const t = useT();
  const [locale] = useLocale();

  const targets = {
    leu: Math.round(BCAA_TARGETS_MG_PER_KG.leucine * profile.weightKg),
    ile: Math.round(BCAA_TARGETS_MG_PER_KG.isoleucine * profile.weightKg),
    val: Math.round(BCAA_TARGETS_MG_PER_KG.valine * profile.weightKg),
  };

  const totals = picked.reduce(
    (acc, name) => {
      const f = BCAA_FOODS.find(b => b.name === name);
      if (!f) return acc;
      return { leu: acc.leu + f.leu, ile: acc.ile + f.ile, val: acc.val + f.val, protein: acc.protein + f.protein };
    },
    { leu: 0, ile: 0, val: 0, protein: 0 },
  );

  const toggle = (name: string) =>
    setPicked(p => (p.includes(name) ? p.filter(x => x !== name) : [...p, name]));

  return (
    <div className="p-6 rounded-2xl bg-deep text-white mb-10">
      <h3 className="text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        {t('aa.bcaaTitle')}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed mb-5">
        {t('aa.bcaaIntro')}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <Goal label={locale === 'ko' ? '류신' : 'Leucine'}    have={totals.leu} target={targets.leu} />
        <Goal label={locale === 'ko' ? '이소류신' : 'Isoleucine'} have={totals.ile} target={targets.ile} />
        <Goal label={locale === 'ko' ? '발린' : 'Valine'}     have={totals.val} target={targets.val} />
      </div>

      <p className="text-xs text-white/50 mb-2">
        {locale === 'ko' ? '식품을 클릭해 샘플 식단에 추가/제거하세요:' : 'Tap foods to add/remove from your sample day:'}
      </p>
      <div className="flex flex-wrap gap-2">
        {BCAA_FOODS.map(f => {
          const active = picked.includes(f.name);
          const displayName = locale === 'ko' ? BCAA_FOODS_KO[f.name]?.name || f.name : f.name;
          const displayServing = locale === 'ko' ? BCAA_FOODS_KO[f.name]?.serving || f.serving : f.serving;
          return (
            <button
              key={f.name}
              onClick={() => toggle(f.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active ? 'bg-terracotta text-white' : 'bg-white/10 text-white/70 hover:bg-white/15'}`}
              title={`${displayServing} · ${f.protein}g protein · ${f.leu} mg Leu`}
            >
              {displayName}
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-white/40 mt-4">
        {locale === 'ko'
          ? `목표: WHO/FAO 2007 (${BCAA_TARGETS_MG_PER_KG.leucine}/${BCAA_TARGETS_MG_PER_KG.isoleucine}/${BCAA_TARGETS_MG_PER_KG.valine} mg/kg) × 사용자 체중 ${profile.weightKg} kg. 프로필에서 체중을 수정할 수 있습니다.`
          : `Targets: WHO/FAO 2007 (${BCAA_TARGETS_MG_PER_KG.leucine}/${BCAA_TARGETS_MG_PER_KG.isoleucine}/${BCAA_TARGETS_MG_PER_KG.valine} mg/kg) × your ${profile.weightKg} kg. Edit weight in the Profile panel.`}
      </p>
    </div>
  );
}

function Goal({ label, have, target }: { label: string; have: number; target: number }) {
  const pct = target > 0 ? Math.min(100, (have / target) * 100) : 0;
  const met = have >= target;
  const color = met ? '#86d09a' : pct > 60 ? '#e8c987' : '#f1a07c';
  const [locale] = useLocale();
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-[11px] text-white/40 tabular-nums">
          {have} / {target} mg
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <p className="text-[10px] mt-0.5" style={{ color }}>
        {met
          ? (locale === 'ko' ? '✓ 목표 달성' : '✓ target met')
          : (locale === 'ko' ? `${Math.round(target - have)} mg 부족` : `${Math.round(target - have)} mg short`)}
      </p>
    </div>
  );
}

// === Complete-protein matchmaker (plant complementarity) ===
const COMPLEMENTS: { base: string; pairs: { food: string; rationale: string }[] }[] = [
  {
    base: 'Beans / lentils / peas',
    pairs: [
      { food: 'Brown rice / wheat / corn', rationale: 'Grains supply methionine; legumes supply lysine — combined = complete protein.' },
      { food: 'Nuts / seeds',              rationale: 'Sesame, sunflower, and pumpkin seeds plug the methionine gap.' },
      { food: 'Whole-wheat tortilla',      rationale: 'Classic combo (rice & beans, hummus & pita, dal & roti).' },
    ],
  },
  {
    base: 'Grains (rice, oats, wheat, corn)',
    pairs: [
      { food: 'Beans / lentils', rationale: 'Lysine-rich legumes complete the grain\'s amino-acid profile.' },
      { food: 'Soy / tofu / edamame', rationale: 'Soy is a complete protein on its own — instantly elevates any grain.' },
      { food: 'Dairy or eggs',   rationale: 'Animal proteins are complete and high in lysine.' },
    ],
  },
  {
    base: 'Nuts & seeds',
    pairs: [
      { food: 'Beans / lentils', rationale: 'Adds the lysine that nuts/seeds run short on.' },
      { food: 'Whole grains',    rationale: 'Peanut butter on whole-wheat toast — old-school complete pairing.' },
    ],
  },
  {
    base: 'Vegetables',
    pairs: [
      { food: 'Quinoa / soy / amaranth', rationale: 'These three plant proteins are complete on their own.' },
      { food: 'Beans + grains',          rationale: 'A bean-and-grain bowl rounds out any vegetable stir-fry.' },
    ],
  },
];

const COMPLEMENTS_KO = [
  {
    base: '콩류 / 렌틸콩 / 완두콩',
    pairs: [
      { food: '현미 / 밀 / 옥수수', rationale: '곡물은 메티오닌을 공급하고, 두류는 라이신을 공급하여 결합 시 완전 단백질이 됩니다.' },
      { food: '견과류 / 씨앗류', rationale: '참깨, 해바라기씨, 호박씨 등이 부족한 메티오닌 성분을 채워줍니다.' },
      { food: '통밀 또띠아', rationale: '쌀과 콩, 후무스와 피타 브레드, 달(Dal)과 로티 등 고전적인 채식 단백질 조합입니다.' },
    ],
  },
  {
    base: '곡류 (쌀, 귀리, 밀, 옥수수)',
    pairs: [
      { food: '콩류 / 렌틸콩', rationale: '라이신이 풍부한 두류가 곡물의 아미노산 프로필을 상호 보완해 완성해 줍니다.' },
      { food: '대두 / 두부 / 에다마메(풋콩)', rationale: '대두는 그 자체로 완전 단백질이므로 모든 곡류의 질을 즉각적으로 높여줍니다.' },
      { food: '유제품 또는 계란', rationale: '동물성 단백질은 완전 단백질이며 라이신 함량이 높습니다.' },
    ],
  },
  {
    base: '견과류 및 씨앗류',
    pairs: [
      { food: '콩류 / 렌틸콩', rationale: '견과류/씨앗류에 부족하기 쉬운 라이신을 두류가 채워줍니다.' },
      { food: '통곡물', rationale: '통밀 식빵에 땅콩버터 바르기 — 오랜 역사의 대표적인 완전 단백질 조합입니다.' },
    ],
  },
  {
    base: '채소류',
    pairs: [
      { food: '퀴노아 / 대두 / 아마란스', rationale: '이 세 가지 식물성 단백질은 그 자체로 이미 완전 단백질입니다.' },
      { food: '콩류 + 곡류', rationale: '채소 볶음에 콩과 현미밥 한 그릇을 곁들이면 모든 단백질 아미노산이 골고루 충족됩니다.' },
    ],
  },
];

function CompleteProteinMatchmaker() {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = useT();
  const [locale] = useLocale();
  const list = locale === 'ko' ? COMPLEMENTS_KO : COMPLEMENTS;
  const current = list[activeIdx] || list[0];
  return (
    <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
      <h3 className="text-lg text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        {t('aa.completeTitle')}
      </h3>
      <p className="text-sm text-deep/60 leading-relaxed mb-4">
        {t('aa.completeIntro')}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {list.map((c, idx) => (
          <button
            key={c.base}
            onClick={() => setActiveIdx(idx)}
            className={`text-xs px-3 py-1.5 rounded-md font-medium ${activeIdx === idx ? 'bg-deep text-inverse' : 'bg-surface text-deep/60 hover:bg-deep/10'}`}
          >
            {c.base}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {current.pairs.map(p => (
          <div key={p.food} className="p-4 rounded-xl bg-[#4a7c59]/5 border border-[#4a7c59]/10">
            <p className="text-sm font-medium text-deep mb-1">+ {p.food}</p>
            <p className="text-xs text-deep/60 leading-relaxed">{p.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// === Acid Detail Dialog ===
function AcidDetailDialog({
  acid,
  open,
  onClose,
}: {
  acid: AminoAcid | null;
  open: boolean;
  onClose: () => void;
}) {
  const [locale] = useLocale();
  const localizedAcid = acid ? localizeAminoAcid(acid, locale) : null;
  if (!localizedAcid) return null;
  const cat = categoryLabels[localizedAcid.category];
  const catLabel = getCategoryLabel(localizedAcid.category, locale);
  const isKo = locale === 'ko';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto p-0 gap-0"
        style={{ backgroundColor: '#ffffff', borderColor: 'rgba(32,42,38,0.08)' }}
      >
        {/* Header */}
        <div
          className="p-6 pb-4"
          style={{
            borderBottom: '1px solid rgba(32,42,38,0.06)',
            backgroundColor: localizedAcid.essential ? 'rgba(74,124,89,0.03)' : 'rgba(107,125,118,0.03)',
          }}
        >
          <div className="flex items-start gap-4">
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
              style={{ backgroundColor: localizedAcid.essential ? '#4a7c59' : '#6b7d76' }}
            >
              {localizedAcid.abbreviation1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle
                  className="text-xl font-medium text-deep"
                  style={{ fontFamily: 'Playfair Display, serif', lineHeight: 1.2 }}
                >
                  {localizedAcid.name}
                </DialogTitle>
                {localizedAcid.essential && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4a7c59] text-white">
                    {isKo ? '필수' : 'Essential'}
                  </span>
                )}
              </div>
              <DialogDescription className="text-xs text-deep/40 font-mono mt-1">
                {localizedAcid.abbreviation3} — {localizedAcid.abbreviation1} ·{' '}
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: cat.bg, color: cat.color }}
                >
                  {catLabel}
                </span>
              </DialogDescription>
            </div>
          </div>
        </div>

        <DialogHeader className="sr-only">
          <DialogTitle>{localizedAcid.name}</DialogTitle>
          <DialogDescription>
            {isKo ? `${localizedAcid.name}의 상세 정보` : `Detailed information about ${localizedAcid.name}`}
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Functions */}
          <section>
            <h4 className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {isKo ? '주요 기능' : 'Key Functions'}
            </h4>
            <div className="space-y-2">
              {localizedAcid.functions.map((fn, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: (localizedAcid.essential ? '#4a7c59' : '#6b7d76') + '15' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke={localizedAcid.essential ? '#4a7c59' : '#6b7d76'} strokeWidth="2">
                      <path d="M3 8l3 3 7-7" />
                    </svg>
                  </div>
                  <span className="text-sm text-deep/70 leading-relaxed">{fn}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Food Sources */}
          <section>
            <h4 className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {isKo ? '식품 공급원' : 'Food Sources'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {localizedAcid.foodSources.map((src) => (
                <span
                  key={src}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: (localizedAcid.essential ? '#4a7c59' : '#6b7d76') + '10',
                    color: localizedAcid.essential ? '#4a7c59' : '#6b7d76',
                  }}
                >
                  {src}
                </span>
              ))}
            </div>
          </section>

          {/* Deficiency Effects */}
          <section>
            <h4 className="text-xs uppercase tracking-wider text-deep/40 mb-3">
              {isKo ? '결핍 시 증상' : 'Deficiency Effects'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {localizedAcid.deficiencyEffects.map((eff, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ backgroundColor: '#d95c39' + '10', color: '#d95c39' }}
                >
                  {eff}
                </span>
              ))}
            </div>
          </section>

          {/* Daily Need */}
          {localizedAcid.dailyNeed && (
            <section
              className="p-4 rounded-xl"
              style={{ backgroundColor: localizedAcid.essential ? 'rgba(74,124,89,0.06)' : 'rgba(107,125,118,0.06)' }}
            >
              <p className="text-[10px] uppercase tracking-wider text-deep/40 mb-1">
                {isKo ? '하루 권장량' : 'Daily Requirement'}
              </p>
              <p className="text-sm font-medium text-deep">{localizedAcid.dailyNeed}</p>
              <p className="text-[10px] text-deep/30 mt-1">
                {isKo ? 'WHO/FAO 2007 기준' : 'Based on WHO/FAO 2007'}
              </p>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// === Complete vs. Incomplete Proteins (expanded) ===
const PROTEIN_COMPARISON = {
  en: {
    complete: {
      label: 'Complete Proteins',
      description: 'Contain all 9 essential amino acids in ratios that match human needs.',
      sources: ['Eggs', 'Fish', 'Chicken', 'Beef', 'Dairy', 'Quinoa', 'Soy', 'Buckwheat', 'Hemp seeds'],
      pros: ['No combining needed', 'High bioavailability (PDCAAS ~1.0)', 'Ideal for muscle repair'],
      note: 'Animal proteins are complete; only a few plant proteins (soy, quinoa, buckwheat, hemp) are complete on their own.',
    },
    incomplete: {
      label: 'Incomplete Proteins',
      description: 'Low or missing in one or more essential amino acids.',
      sources: ['Rice', 'Wheat', 'Beans', 'Lentils', 'Nuts', 'Seeds', 'Most vegetables'],
      limiting: [
        { food: 'Grains (rice, wheat, corn)', lacking: 'Lysine', richIn: 'Methionine' },
        { food: 'Legumes (beans, lentils, peas)', lacking: 'Methionine', richIn: 'Lysine' },
        { food: 'Nuts & seeds', lacking: 'Lysine', richIn: 'Methionine' },
      ],
      note: 'Not inferior — just pair them across the day. Your body pools amino acids for ~24 hours.',
    },
    myth: {
      title: 'Myth-buster: You do NOT need to combine proteins in the same meal.',
      body: 'Research (Young & Pellett, 1994; Academy of Nutrition & Dietetics) shows that eating a variety of plant proteins across the day is sufficient. Your body maintains a free amino-acid pool and can assemble complete proteins from meals eaten hours apart.',
    },
  },
  ko: {
    complete: {
      label: '완전 단백질',
      description: '9가지 필수 아미노산을 모두 포함하고, 인체 필요 비율에 맞춰 제공합니다.',
      sources: ['계란', '생선', '닭고기', '쇠고기', '유제품', '퀴노아', '대두', '메밀', '햄프씨드'],
      pros: ['별도 조합 불필요', '생체이용률 높음 (PDCAAS ~1.0)', '근육 회복에 최적'],
      note: '동물성 단백질은 모두 완전 단백질이며, 식물성 중에서는 대두·퀴노아·메밀·햄프씨드 등 소수만이 완전 단백질입니다.',
    },
    incomplete: {
      label: '불완전 단백질',
      description: '하나 이상의 필수 아미노산이 부족하거나 비율이 낮습니다.',
      sources: ['쌀', '밀', '콩', '렌틸', '견과', '씨앗', '대부분의 채소'],
      limiting: [
        { food: '곡류(쌀, 밀, 옥수수)', lacking: '라이신', richIn: '메티오닌' },
        { food: '콩류(강낭콩, 렌틸, 완두)', lacking: '메티오닌', richIn: '라이신' },
        { food: '견과·씨앗', lacking: '라이신', richIn: '메티오닌' },
      ],
      note: '열등한 것이 아닙니다 — 하루 안에 조합만 해 주면 됩니다. 몸은 약 24시간 동안 아미노산을 저장·조합합니다.',
    },
    myth: {
      title: '오해 바로잡기: 같은 끼니에 꼭 조합할 필요는 없습니다.',
      body: '연구(Young & Pellett, 1994; 미국영양·식이학회)에 따르면, 하루 동안 다양한 식물성 단백질을 섭취하는 것으로 충분합니다. 몸은 자유 아미노산 풀을 유지하며, 몇 시간 간격으로 먹은 식사에서도 완전 단백질을 조합할 수 있습니다.',
    },
  },
};

function CompleteVsIncomplete({ locale }: { locale: 'en' | 'ko' }) {
  const data = PROTEIN_COMPARISON[locale];
  const [activeTab, setActiveTab] = useState<'complete' | 'incomplete'>('complete');
  const t = useT();

  return (
    <div className="p-6 rounded-2xl bg-white border border-deep/5 mb-10">
      <h3 className="text-lg text-deep mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        {t('aa.completeNoteTitle')}
      </h3>
      <p className="text-sm text-deep/60 leading-relaxed mb-5">
        {locale === 'ko'
          ? '"완전 단백질"은 9가지 필수 아미노산을 충분한 비율로 모두 포함합니다. 동물성 식품은 대체로 완전 단백질이고, 대부분의 식물성 단백질은 한 가지 이상이 부족하지만 하루 안에 조합하면 완전한 프로필을 만들 수 있습니다.'
          : 'A "complete protein" contains all nine essential amino acids in adequate proportions. Animal sources are typically complete. Most plant sources are "incomplete" — but combining them across the day creates a complete amino-acid profile.'}
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(['complete', 'incomplete'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab
                ? tab === 'complete'
                  ? 'bg-[#4a7c59] text-white'
                  : 'bg-[#c9a96e] text-white'
                : 'bg-surface text-deep/60 hover:bg-deep/10'
            }`}
          >
            {data[tab].label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="space-y-5">
        <p className="text-sm text-deep/70 leading-relaxed">{data[activeTab].description}</p>

        {/* Sources */}
        <div>
          <p className="text-xs uppercase tracking-wider text-deep/40 mb-2">
            {locale === 'ko' ? '대표 식품' : 'Common Sources'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data[activeTab].sources.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: activeTab === 'complete' ? '#4a7c5910' : '#c9a96e10',
                  color: activeTab === 'complete' ? '#4a7c59' : '#c9a96e',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Pros / Limiting amino acids */}
        {activeTab === 'complete' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.complete.pros.map((pro, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#4a7c59]/5 border border-[#4a7c59]/10">
                <p className="text-xs text-deep/70">{pro}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-deep/5">
            <table className="w-full text-sm">
              <thead className="text-deep/40 text-xs uppercase tracking-wider">
                <tr className="border-b border-deep/5">
                  <th className="text-left px-4 py-3 font-medium">{locale === 'ko' ? '식품군' : 'Food Group'}</th>
                  <th className="text-left px-4 py-3 font-medium">{locale === 'ko' ? '부족한 아미노산' : 'Limiting Amino Acid'}</th>
                  <th className="text-left px-4 py-3 font-medium">{locale === 'ko' ? '풍부한 아미노산' : 'Rich In'}</th>
                </tr>
              </thead>
              <tbody>
                {data.incomplete.limiting.map((row) => (
                  <tr key={row.food} className="border-b border-deep/5 last:border-0">
                    <td className="px-4 py-3 text-deep font-medium text-xs">{row.food}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d95c39]/10 text-[#d95c39] font-medium">
                        {row.lacking}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] font-medium">
                        {row.richIn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-deep/50 leading-relaxed italic">{data[activeTab].note}</p>
      </div>

      {/* Myth-buster box */}
      <div className="mt-6 p-4 rounded-xl bg-[#4a90a4]/5 border border-[#4a90a4]/10">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-[#4a90a4]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a90a4" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-deep mb-1">{data.myth.title}</p>
            <p className="text-xs text-deep/60 leading-relaxed">{data.myth.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
