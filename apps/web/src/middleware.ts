import { NextRequest, NextResponse } from 'next/server'

import { getProfile } from './http/get-profile'

// Lista de rotas que requerem uma assinatura paga
const paidRoutes = ['/create-organization']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Função auxiliar para extrair o slug da organização
  const extractOrgSlug = (path: string): string | null => {
    const orgMatch = path.match(/^\/org\/([^/]+)/)
    if (orgMatch) return orgMatch[1]

    const settingsMatch = path.match(/^\/settings\/organization\/([^/]+)/)
    if (settingsMatch) return settingsMatch[1]

    return null
  }

  // Verifica se estamos em uma rota de organização ou configurações
  if (
    pathname.startsWith('/org') ||
    pathname.startsWith('/settings/organization')
  ) {
    let orgSlug = extractOrgSlug(pathname)

    // Se não encontrarmos o slug na URL, tentamos pegar do cookie existente
    if (!orgSlug) {
      const cookieValue = request.cookies.get('org')?.value
      orgSlug = cookieValue || null
    }

    // Se o slug ainda for nulo, redirecionamos para a página inicial
    if (!orgSlug) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Se o slug foi encontrado, armazenamos no cookie
    response.cookies.set('org', orgSlug, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 dias
    })
  }

  // Verifica o status da assinatura do usuário
  try {
    const { user } = await getProfile()

    // Verifica se o usuário está tentando acessar uma rota paga
    if (paidRoutes.some((route) => pathname.startsWith(route))) {
      if (user.subscription === 'FREE') {
        // Redireciona usuários gratuitos para uma página de upgrade ou mostra um erro
        return NextResponse.redirect(new URL('/upgrade', request.url))
      }
    }

    // Define o status da assinatura nos headers para uso na aplicação
    response.headers.set('X-User-Subscription', user.subscription)
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error)
    // Se houver um erro ao obter o perfil, assumimos que o usuário não está autenticado
    if (paidRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
