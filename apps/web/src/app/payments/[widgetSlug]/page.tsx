import { getWidget } from '@/http/get-widget'

import CheckoutForm from '../payment-form'

export default async function WidgetPage({
  params,
}: {
  params: { widgetSlug: string }
}) {
  const { widget } = await getWidget({ widgetSlug: params.widgetSlug })
  console.log(widget)

  return <CheckoutForm widget={widget} />
}
