import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-20 text-white sm:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Grow Your Business with{' '}
              <span className="text-secondary-400">Strategic Digital Marketing</span>
            </h1>
            <p className="mb-8 text-lg text-primary-100 sm:text-xl md:text-2xl">
              We help businesses achieve their goals through data-driven marketing strategies
              and exceptional execution.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white bg-transparent text-white hover:bg-white hover:text-primary-600"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary-600 sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Why Choose MarketingCo?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We combine creativity, data, and technology to deliver exceptional results
              for our clients.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card-hover rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Comprehensive digital marketing solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesPreview.map((service) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                <ul className="mb-4 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16 text-white sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Grow Your Business?
            </h2>
            <p className="mb-8 text-lg text-primary-100 sm:text-xl">
              Let's discuss how we can help you achieve your marketing goals.
              Get a free consultation today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white bg-transparent text-white hover:bg-white hover:text-primary-600"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const stats = [
  { value: '500+', label: 'Clients Served' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '250%', label: 'Average ROI' },
  { value: '50+', label: 'Team Members' },
]

const features = [
  {
    title: 'Data-Driven Strategy',
    description:
      'We use advanced analytics and market research to create strategies that deliver measurable results.',
    icon: BarChart3,
  },
  {
    title: 'Expert Team',
    description:
      'Our team of certified specialists brings years of experience across all digital marketing channels.',
    icon: Users,
  },
  {
    title: 'Proven Results',
    description:
      'Track record of helping businesses achieve 250%+ ROI and significant growth in revenue.',
    icon: TrendingUp,
  },
  {
    title: 'Targeted Campaigns',
    description:
      'Reach your ideal customers with precision-targeted campaigns across multiple platforms.',
    icon: Target,
  },
  {
    title: 'Full Transparency',
    description:
      'Access real-time dashboards and detailed reports to track every aspect of your campaigns.',
    icon: Megaphone,
  },
  {
    title: 'Fast Execution',
    description:
      'Quick turnaround times and agile processes ensure your campaigns launch on schedule.',
    icon: Zap,
  },
]

const servicesPreview = [
  {
    title: 'Search Engine Optimization',
    slug: 'seo',
    description: 'Improve your organic search rankings and drive qualified traffic.',
    icon: Target,
    features: [
      'Technical SEO Audit',
      'Keyword Research',
      'On-Page Optimization',
      'Link Building',
    ],
  },
  {
    title: 'Pay-Per-Click Advertising',
    slug: 'ppc',
    description: 'Drive immediate results with strategic paid advertising campaigns.',
    icon: Megaphone,
    features: [
      'Google Ads Management',
      'Display Advertising',
      'Shopping Ads',
      'Conversion Tracking',
    ],
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media',
    description: 'Build brand awareness and engage your audience on social platforms.',
    icon: Users,
    features: [
      'Social Strategy',
      'Content Creation',
      'Community Management',
      'Social Advertising',
    ],
  },
]
