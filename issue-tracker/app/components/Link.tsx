import NextLink from 'next/link'
import {Link as RadixLink} from '@radix-ui/themes'

interface ILinkProps {
    href: string
    children: string
}
const Link = ({href, children}:ILinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
