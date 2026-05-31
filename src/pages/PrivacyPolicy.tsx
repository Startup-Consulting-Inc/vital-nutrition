import { useLocale } from '@/lib/i18n';
import SEOHead from '@/components/SEOHead';

export default function PrivacyPolicy() {
  const [locale] = useLocale();
  const isKo = locale === 'ko';

  const content = isKo
    ? {
        title: '개인정보처리방침',
        eyebrow: 'Legal',
        updated: '최종 수정일: 2026년 5월 30일',
        sections: [
          {
            heading: '1. 개요',
            text: 'VITAL(이하 "당사")은 사용자의 개인정보 보호를 매우 중요하게 생각합니다. 본 개인정보처리방침은 당사가 수집하는 정보, 그 정보를 사용하는 방법, 그리고 사용자가 가진 권리에 대해 설명합니다.',
          },
          {
            heading: '2. 수집하는 정보',
            text: '당사는 서비스 제공을 위해 최소한의 정보만 수집합니다. 식품 라벨 분석기에서 업로드한 사진은 브라우저 내에서만 처리되며, 당사 서버로 전송되거나 저장되지 않습니다. 사용자가 자발적으로 제공하는 프로필 정보(나이, 체중, 키, 성별, 활동 수준 등)는 브라우저의 로컬 스토리지에만 저장되며, 동기화를 위해 선택적으로 Firebase Authentication 및 Firestore에 저장될 수 있습니다.',
          },
          {
            heading: '3. 정보 사용 목적',
            text: '수집된 정보는 다음 목적으로만 사용됩니다: (1) 개인화된 영양 목표량 계산, (2) 식품 건강 점수 산정, (3) 식단 기록 저장 및 동기화, (4) 서비스 개선 및 버그 수정.',
          },
          {
            heading: '4. 제3자 제공',
            text: '당사는 사용자의 개인정보를 제3자에게 판매, 대여 또는 공유하지 않습니다. 법적 의무가 있거나 사용자의 명시적 동의가 있는 경우에만 예외적으로 제공될 수 있습니다.',
          },
          {
            heading: '5. 데이터 보안',
            text: '당사는 업계 표준 보안 조치를 적용하여 사용자 데이터를 보호합니다. 모든 데이터 전송은 HTTPS를 통해 암호화되며, 인증 정보는 Firebase Authentication의 보안 인프라를 통해 관리됩니다.',
          },
          {
            heading: '6. 쿠키 및 추적 기술',
            text: '당사는 서비스 기능 제공 및 사용 분석을 위해 필수 쿠키와 선택적 분석 쿠키를 사용할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 사용을 제한할 수 있습니다.',
          },
          {
            heading: '7. 사용자 권리',
            text: '사용자는 언제든지 자신의 개인정보에 접근, 수정, 삭제를 요청할 수 있습니다. 계정 삭제를 원하시면 contact@koreatous.com으로 요청해 주세요.',
          },
          {
            heading: '8. 변경사항',
            text: '본 개인정보처리방침은 수시로 업데이트될 수 있습니다. 중요한 변경사항이 있을 경우 서비스 내 공지 또는 이메일을 통해 알려드립니다.',
          },
          {
            heading: '9. 문의',
            text: '개인정보 관련 문의는 jsong@koreatous.com으로 연락 주시기 바랍니다.',
          },
        ],
      }
    : {
        title: 'Privacy Policy',
        eyebrow: 'Legal',
        updated: 'Last updated: May 30, 2026',
        sections: [
          {
            heading: '1. Overview',
            text: 'VITAL ("we," "us," or "our") values your privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have.',
          },
          {
            heading: '2. Information We Collect',
            text: 'We collect the minimum information necessary to provide our services. Photos uploaded to the label analyzer are processed entirely in your browser and are never transmitted to or stored on our servers. Profile information you voluntarily provide (age, weight, height, gender, activity level) is stored locally in your browser, and may optionally be synced to Firebase Authentication and Firestore if you choose to sign in.',
          },
          {
            heading: '3. How We Use Information',
            text: 'Collected information is used solely for: (1) calculating personalized nutrition targets, (2) scoring food health indices, (3) storing and syncing meal logs, and (4) improving our service and fixing bugs.',
          },
          {
            heading: '4. Third-Party Sharing',
            text: 'We do not sell, rent, or share your personal information with third parties. We may only disclose information when legally required or with your explicit consent.',
          },
          {
            heading: '5. Data Security',
            text: 'We apply industry-standard security measures to protect your data. All data transmissions are encrypted via HTTPS, and authentication is managed through Firebase Authentication\'s secure infrastructure.',
          },
          {
            heading: '6. Cookies & Tracking',
            text: 'We may use essential cookies for service functionality and optional analytics cookies to understand usage. You can restrict cookie use through your browser settings.',
          },
          {
            heading: '7. Your Rights',
            text: 'You have the right to access, modify, or delete your personal information at any time. To request account deletion, please contact us at jsong@koreatous.com.',
          },
          {
            heading: '8. Changes',
            text: 'This Privacy Policy may be updated from time to time. We will notify you of significant changes through in-service notices or email.',
          },
          {
            heading: '9. Contact',
            text: 'For privacy-related inquiries, please contact us at jsong@koreatous.com.',
          },
        ],
      };

  return (
    <div className="w-full py-20 px-6" style={{ backgroundColor: '#f6f5f1' }}>
      <SEOHead
        title={content.title}
        description={isKo ? 'VITAL의 개인정보처리방침입니다.' : 'VITAL Privacy Policy.'}
        path="/privacy"
        type="article"
        dateModified="2026-05-30"
        breadcrumb={[{ name: 'Home', path: '/' }, { name: content.title, path: '/privacy' }]}
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
