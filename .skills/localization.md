# Localization Skill

## Overview

This skill implements i18n localization for the Hishabee web application using react-i18next. It provides automatic language detection based on user IP location and manual language switching.

## Language Selection Logic

- **Bangladesh (BD)**: Bengali (bn)
- **Other countries**: English (en)
- User can manually switch languages via toggle in navbar
- Language preference is persisted in localStorage

## Key Files

### Configuration

- `src/i18next.ts` - i18n configuration with language detection
- `src/messages/en.json` - English translations
- `src/messages/bn.json` - Bengali translations

### Components

- `src/components/common/LanguageToggle.tsx` - Language switcher component

### Hooks

- `src/hooks/use-geo-info.ts` - Geo location detection (already exists)
- `src/hooks/use-language.ts` - Language management hook

### Store Integration

- `src/stores/store.ts` - Geo info stored with country code

## Usage

### In Components

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("welcome")}</h1>;
}
```

### Language Toggle

```tsx
import { LanguageToggle } from "@/components/common/LanguageToggle";

<LanguageToggle />;
```

### Programmatic Language Change

```tsx
import { useLanguage } from "@/hooks/use-language";

const { changeLanguage, currentLanguage } = useLanguage();
changeLanguage("en"); // or "bn"
```

## Translation Keys Structure

### Common Keys

```json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success"
  }
}
```

### Navigation Keys

```json
{
  "nav": {
    "features": "Features",
    "howItWorks": "How it works",
    "buildApp": "Build your app"
  }
}
```

## Adding New Translations

1. Add key to `src/messages/en.json`
2. Add corresponding translation to `src/messages/bn.json`
3. Use in component with `t("key.path")`

## Language Detection Flow

1. Check localStorage for saved preference
2. If no preference, use geo info from IP
3. If country is BD → Bengali, else → English
4. User can override via toggle

## Supported Languages

- `en` - English
- `bn` - Bengali (বাংলা)
