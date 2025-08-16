import DashboardHeader from '@/components/DashboardHeader'
import NavBar from '@/components/NavBar'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='w-full max-w-[1440px] mx-auto flex h-screen bg-background'>
      <NavBar />
      <main className='w-full p-8 pt-0'>
      <DashboardHeader />
        <div className='max-w-7xl mx-auto'>
          {/* Dashboard content will go here */}
          <div className='bg-surface rounded-[16px] p-6'>
            <h2 className='text-white text-[24px] font-regular mb-4'>
              Добро пожаловать в дашборд
            </h2>
            <p className='text-muted text-[14px]'>
              Здесь будет основное содержимое дашборда
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
