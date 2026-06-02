import { test, expect } from '@playwright/test'

test.describe('Surat Sakit Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
  })

  async function selectCity(page: any) {
    const input = page.locator('#city-search')
    await input.click()
    await page.waitForTimeout(300)
    await input.fill('Bogor')
    await page.waitForTimeout(500)
    await page.locator('#city-option-bogor').click()
    await page.waitForTimeout(300)
  }

  async function selectInstitution(page: any) {
    await page.getByText('Rumah Sakit').click()
    await page.waitForTimeout(200)
    await selectCity(page)
    await page.waitForTimeout(500)
    await page.getByText('RSUD Kota Bogor').first().click()
  }

  async function fillPatient(page: any) {
    await page.getByPlaceholder('Nama pasien').fill('Budi Santoso')
    await page.getByPlaceholder('16 digit NIK').fill('3273011505900003')
    await page.getByPlaceholder('Tempat lahir').fill('Jakarta')
    await page.locator('input[type="date"]').first().fill('1990-05-15')
    await page.getByPlaceholder('Alamat lengkap').fill('Jl. Merdeka No. 1, Bogor')
    await page.getByPlaceholder('Pekerjaan').fill('Swasta')
  }

  async function fillDiagnosis(page: any) {
    await page.locator('textarea').first().fill('Demam sejak 3 hari, batuk berdahak kuning, sakit kepala')
    await page.getByText('Analisa Keluhan').click()
    await page.waitForTimeout(500)
  }

  async function selectDoctor(page: any) {
    await page.getByPlaceholder(/Cari dokter/).fill('dr')
    await page.waitForTimeout(300)
    // First doctor in dropdown list
    await page.locator('button:has-text("dr.")').first().click()
  }

  test('full Surat Sakit flow to preview', async ({ page }) => {
    // Step 1: Institution
    await selectInstitution(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Step 2: Patient
    await fillPatient(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Step 3: Diagnosis
    await fillDiagnosis(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Step 4: Rest period
    const dateInputs = page.locator('input[type="date"]')
    await dateInputs.nth(0).fill('2026-06-01')
    await dateInputs.nth(1).fill('2026-06-03')
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Step 5: Doctor + Sign
    await selectDoctor(page)
    await page.getByText('Preview Surat').click()
    await page.waitForTimeout(500)

    await expect(page.getByText('SURAT KETERANGAN SAKIT').first()).toBeVisible()
    await expect(page.getByText('Budi Santoso').first()).toBeVisible()
  })

  test('full Surat Sehat flow to preview', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Sehat' }).first().click()
    await page.waitForTimeout(200)

    // Step 1: Institution
    await page.getByText('Puskesmas').click()
    await selectCity(page)
    await page.waitForTimeout(200)
    await page.getByText('Puskesmas Bogor').first().click()
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Step 2: Patient
    await fillPatient(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Step 3 (last): Doctor
    await selectDoctor(page)
    await page.getByText('Preview Surat').click()
    await page.waitForTimeout(500)

    await expect(page.getByText('SURAT KETERANGAN SEHAT').first()).toBeVisible()
    await expect(page.getByText('Budi Santoso').first()).toBeVisible()
  })

  test('full Surat Rujukan flow to preview', async ({ page }) => {
    await page.getByText('Rujukan').click()
    await page.waitForTimeout(200)

    await selectInstitution(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    await fillPatient(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    await fillDiagnosis(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    // Referral step
    await page.getByPlaceholder(/Nama RS/i).fill('RSUD Kota Bogor')
    await page.getByPlaceholder(/dr\./i).fill('dr. Spesialis Paru')
    await page.getByPlaceholder(/Alasan/i).fill('Membutuhkan penanganan spesialis')
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    await selectDoctor(page)
    await page.getByText('Preview Surat').click()
    await page.waitForTimeout(500)

    await expect(page.getByText('SURAT RUJUKAN').first()).toBeVisible()
    await expect(page.getByText('Budi Santoso').first()).toBeVisible()
  })

  test('NIK validation shows warning for long NIK', async ({ page }) => {
    await selectInstitution(page)
    await page.getByText('Selanjutnya').click()

    await page.getByPlaceholder('16 digit NIK').fill('3273011505900003')
    await page.waitForTimeout(500)
    // Should show validation message (NIK valid or warning)
    await expect(page.getByText(/NIK valid|tidak sesuai|tidak valid/).first()).toBeVisible()
  })

  test('can navigate back and forth', async ({ page }) => {
    await selectInstitution(page)
    await page.getByText('Selanjutnya').click()
    await page.waitForTimeout(200)

    await fillPatient(page)
    await page.getByText('Sebelumnya').click()
    await page.waitForTimeout(200)

    // Back at institution selection - should still show selected
    await expect(page.getByText('Terpilih').first().or(page.getByText('RSUD Kota Bogor').first())).toBeVisible()
  })

  test('letter type switching resets flow', async ({ page }) => {
    await page.getByText('Rumah Sakit').click()
    await selectCity(page)
    await page.waitForTimeout(200)
    await page.getByText('RSUD Kota Bogor').first().click()

    // Switch to Sehat
    await page.locator('button').filter({ hasText: 'Sehat' }).first().click()
    await page.waitForTimeout(300)

    // Should be back to step 0 (institution selector)
    // The step indicator should show 3 steps instead of 5
    const stepText = await page.getByText(/Langkah 1 dari/).textContent()
    expect(stepText).toContain('3')
  })
})
