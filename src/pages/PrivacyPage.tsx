import { privacyPolicy } from '../data/privacy'
import { LegalPage } from './LegalPage'

export default function PrivacyPage() {
  return <LegalPage content={privacyPolicy} />
}