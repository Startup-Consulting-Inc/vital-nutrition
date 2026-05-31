import { useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';

export default function TermsOfService() {
  const [locale] = useLocale();
  const isKo = locale === 'ko';

  const content = isKo
    ? {
        title: '이용약관',
        eyebrow: 'Legal',
        updated: '최종 수정일: 2026년 5월 30일',
        sections: [
          {
            heading: '1. 서비스 수락',
            text: 'VITAL 웹사이트 및 관련 서비스(이하 "서비스")에 접속하거나 사용함으로써, 귀하는 본 이용약관에 동의하게 됩니다. 동의하지 않으시는 경우 서비스 사용을 자제해 주세요.',
          },
          {
            heading: '2. 서비스 설명',
            text: 'VITAL은 영양 라벨 분석, 식품 비교, 영양소 백과사전, 식단 기록 등의 교육용 도구를 제공합니다. 본 서비스는 의학적 조언을 대체하지 않으며, 임신, 만성질환, 알레르기 또는 보충제 복용 시 반드시 등록 영양사나 의사와 상담하시기 바랍니다.',
          },
          {
            heading: '3. 사용자 계정',
            text: '일부 기능은 계정 생성이 필요할 수 있습니다. 계정 정보의 정확성과 보안 유지는 사용자의 책임입니다. 타인의 계정을 무단으로 사용해서는 안 됩니다.',
          },
          {
            heading: '4. 지식재산권',
            text: 'VITAL의 모든 콘텐츠, 디자인, 로고, 소프트웨어는 당사 또는 라이선스 제공자의 지식재산입니다. 사전 서면 동의 없이 복제, 수정, 배포, 판매할 수 없습니다.',
          },
          {
            heading: '5. 금지 행위',
            text: '사용자는 다음 행위를 해서는 안 됩니다: (1) 서비스의 정상적인 작동을 방해하는 행위, (2) 불법적이거나 해로운 콘텐츠 업로드, (3) 다른 사용자의 권리를 침해하는 행위, (4) 자동화된 스크립트나 크롤러를 통한 무단 접근.',
          },
          {
            heading: '6. 책임의 한계',
            text: 'VITAL은 교육 목적으로 제공되며 "있는 그대로" 제공됩니다. 당사는 서비스의 정확성, 신뢰성, 적시성에 대해 어떠한 보증도 하지 않습니다. 서비스 사용으로 인해 발생하는 직접적, 간접적, 부수적, 특별 또는 결과적 손해에 대해 책임을 지지 않습니다.',
          },
          {
            heading: '7. 서비스 변경 및 종료',
            text: '당사는 사전 통지 없이 언제든지 서비스의 전부 또는 일부를 수정, 일시 중단 또는 종료할 수 있습니다.',
          },
          {
            heading: '8. 준거법',
            text: '본 이용약관은 미국 워싱턴주 법률에 따라 해석되며, 분쟁 발생 시 해당 관할 법원의 전속 관할권에 따릅니다.',
          },
          {
            heading: '9. 문의',
            text: '이용약관 관련 문의는 jsong@koreatous.com으로 연락 주시기 바랍니다.',
          },
        ],
      }
    : {
        title: 'Terms of Service',
        eyebrow: 'Legal',
        updated: 'Last updated: May 30, 2026',
        sections: [
          {
            heading: '1. Acceptance of Terms',
            text: 'By accessing or using the VITAL website and related services (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.',
          },
          {
            heading: '2. Description of Service',
            text: 'VITAL provides educational tools including nutrition label analysis, food comparison, nutrient encyclopedia, and meal logging. The Service is not a substitute for medical advice. Always consult a registered dietitian or physician for pregnancy, chronic conditions, allergies, or supplement dosing.',
          },
          {
            heading: '3. User Accounts',
            text: 'Some features may require account creation. You are responsible for maintaining the accuracy and security of your account information. You may not use another user\'s account without authorization.',
          },
          {
            heading: '4. Intellectual Property',
            text: 'All content, design, logos, and software on VITAL are the intellectual property of VITAL or its licensors. You may not reproduce, modify, distribute, or sell any part without prior written consent.',
          },
          {
            heading: '5. Prohibited Conduct',
            text: 'You may not: (1) interfere with the normal operation of the Service, (2) upload illegal or harmful content, (3) infringe on the rights of other users, or (4) use automated scripts or crawlers to access the Service without authorization.',
          },
          {
            heading: '6. Limitation of Liability',
            text: 'VITAL is provided for educational purposes and on an "as is" basis. We make no warranties regarding accuracy, reliability, or timeliness. We are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Service.',
          },
          {
            heading: '7. Modifications and Termination',
            text: 'We may modify, suspend, or terminate the Service in whole or in part at any time without prior notice.',
          },
          {
            heading: '8. Governing Law',
            text: 'These Terms shall be governed by the laws of the State of Washington, USA, and any disputes shall be subject to the exclusive jurisdiction of the courts located therein.',
          },
          {
            heading: '9. Contact',
            text: 'For questions about these Terms, please contact us at jsong@koreatous.com.',
          },
        ],
      };

  return (
    <div className="w-full py-20 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead
        title={content.title}
        description={isKo ? 'VITAL의 이용약관입니다.' : 'VITAL Terms of Service.'}
        path="/terms"
        type="article"
        dateModified="2026-05-30"
        breadcrumb={[{ name: 'Home', path: '/' }, { name: content.title, path: '/terms' }]}
      />
      <div className="max-w-[920px] mx-auto">
        <p className="text-sm mb-3" style={{ color: '#d95c39' }}>{content.eyebrow}</p>
        <h1
          className="mb-4"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            letterSpacing: '-0.02em',
            color: '#202a26',
          }}
        >
          {content.title}
        </h1>
        <p className="text-sm mb-12" style={{ color: 'rgba(32,42,38,0.4)' }}>
          {content.updated}
        </p>

        {content.sections.map((section) => (
          <div
            key={section.heading}
            className="bg-white rounded-2xl p-6 sm:p-8 border mb-8"
            style={{ borderColor: 'rgba(32,42,38,0.05)' }}
          >
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: 'Playfair Display, serif', color: '#202a26' }}
            >
              {section.heading}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(32,42,38,0.7)' }}>
              {section.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
