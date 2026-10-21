import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ErrorPage } from '@/components/ui/error-page'

export function NotFoundPage() {
  return (
    <ErrorPage code="404" title="Page not found" description="The page you’re looking for doesn’t exist or has moved.">
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </ErrorPage>
  )
}
