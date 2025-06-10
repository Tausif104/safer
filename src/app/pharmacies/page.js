import DashboardLayout from '@/components/Layout/DashboardLayout';
import PharmaciesList from '@/components/Pharmacy/PharmaciesList';
import React from 'react'

const PharmaciesPage = () => {
  return (
    <DashboardLayout>
      <PharmaciesList />
    </DashboardLayout>
  )
}

export default PharmaciesPage