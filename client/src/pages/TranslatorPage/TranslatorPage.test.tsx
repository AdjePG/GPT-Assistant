import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TranslatorPage from './TranslatorPage'

test('My Translator Page works as expected', async () => {
  const user = userEvent.setup()
  const page = render(<TranslatorPage />)

  const textBoxFrom = page.getByPlaceholderText('Write some text or drop a txt file...')
  await user.type(textBoxFrom, 'Hola mundo')
  const result = await page.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy
})