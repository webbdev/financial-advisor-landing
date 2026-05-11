import { wealthManagement } from '../data/wealth-management'
import { ServicePage } from './ServicePage'

/**
 * Concrete service page = ServicePage layout + content object.
 * Adding "Tax Planning" or "Estate" later is just a new content
 * file in /data and a new wrapper like this one.
 */
const WealthManagementPage = () => {
  return <ServicePage content={wealthManagement} />
}

export default WealthManagementPage
