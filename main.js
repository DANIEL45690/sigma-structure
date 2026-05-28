const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    id: "project_type",
    text: "Тип проекта:",
    options: [
      { value: "web_app", label: "Веб-приложение (React/Vue/Angular)" },
      { value: "backend_api", label: "Backend API (REST/GraphQL)" },
      { value: "fullstack", label: "Fullstack приложение" },
      { value: "mobile_app", label: "Мобильное приложение (React Native)" },
      { value: "cli_tool", label: "CLI инструмент" },
      { value: "desktop_app", label: "Десктоп приложение (Electron)" },
      { value: "library", label: "Библиотека/пакет" },
      { value: "microservice", label: "Микросервис" },
    ],
  },
  {
    id: "framework",
    text: "Выберите фреймворк/стек:",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "express", label: "Express.js" },
      { value: "nestjs", label: "NestJS" },
      { value: "fastapi", label: "FastAPI (Python)" },
      { value: "django", label: "Django (Python)" },
      { value: "spring", label: "Spring Boot (Java)" },
      { value: "dotnet", label: ".NET Core" },
      { value: "none", label: "Без фреймворка" },
    ],
  },
  {
    id: "language",
    text: "Язык программирования:",
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
      { value: "csharp", label: "C#" },
      { value: "php", label: "PHP" },
    ],
  },
  {
    id: "database",
    text: "База данных:",
    options: [
      { value: "postgresql", label: "PostgreSQL" },
      { value: "mysql", label: "MySQL/MariaDB" },
      { value: "mongodb", label: "MongoDB" },
      { value: "sqlite", label: "SQLite" },
      { value: "redis", label: "Redis" },
      { value: "none", label: "Без БД" },
      { value: "multiple", label: "Несколько БД" },
    ],
  },
  {
    id: "testing",
    text: "Тестирование:",
    options: [
      { value: "jest", label: "Jest" },
      { value: "mocha", label: "Mocha + Chai" },
      { value: "pytest", label: "Pytest" },
      { value: "junit", label: "JUnit" },
      { value: "vitest", label: "Vitest" },
      { value: "none", label: "Без тестов (не рекомендуется)" },
    ],
  },
  {
    id: "orm",
    text: "ORM/ODM:",
    options: [
      { value: "prisma", label: "Prisma" },
      { value: "typeorm", label: "TypeORM" },
      { value: "sequelize", label: "Sequelize" },
      { value: "mongoose", label: "Mongoose" },
      { value: "sqlalchemy", label: "SQLAlchemy" },
      { value: "none", label: "Raw SQL/запросы" },
    ],
  },
  {
    id: "architecture",
    text: "Архитектурный паттерн:",
    options: [
      { value: "layered", label: "Слоистая архитектура" },
      { value: "clean", label: "Чистая архитектура (Clean Architecture)" },
      { value: "hexagonal", label: "Гексагональная (Ports & Adapters)" },
      { value: "mvc", label: "MVC" },
      { value: "microservices", label: "Микросервисная" },
      { value: "monolith", label: "Монолит" },
    ],
  },
  {
    id: "state_management",
    text: "Управление состоянием (для фронтенда):",
    options: [
      { value: "redux", label: "Redux Toolkit" },
      { value: "mobx", label: "MobX" },
      { value: "zustand", label: "Zustand" },
      { value: "context", label: "React Context" },
      { value: "pinia", label: "Pinia (Vue)" },
      { value: "ngrx", label: "NgRx (Angular)" },
      { value: "none", label: "Не требуется" },
    ],
  },
  {
    id: "styling",
    text: "Стилизация (фронтенд):",
    options: [
      { value: "css_modules", label: "CSS Modules" },
      { value: "styled_components", label: "Styled Components" },
      { value: "tailwind", label: "Tailwind CSS" },
      { value: "sass", label: "SASS/SCSS" },
      { value: "emotion", label: "Emotion" },
      { value: "vanilla", label: "Vanilla CSS" },
    ],
  },
  {
    id: "deployment",
    text: "Деплоймент:",
    options: [
      { value: "docker", label: "Docker" },
      { value: "kubernetes", label: "Kubernetes" },
      { value: "serverless", label: "Serverless" },
      { value: "vps", label: "VPS/Выделенный сервер" },
      { value: "static_hosting", label: "Статический хостинг" },
      { value: "cloud", label: "Cloud (AWS/GCP/Azure)" },
    ],
  },
  {
    id: "ci_cd",
    text: "CI/CD:",
    options: [
      { value: "github_actions", label: "GitHub Actions" },
      { value: "gitlab_ci", label: "GitLab CI" },
      { value: "jenkins", label: "Jenkins" },
      { value: "circleci", label: "CircleCI" },
      { value: "none", label: "Пока не требуется" },
    ],
  },
  {
    id: "code_style",
    text: "Code Style / Linter:",
    options: [
      { value: "eslint", label: "ESLint + Prettier" },
      { value: "pylint", label: "Pylint + Black" },
      { value: "checkstyle", label: "Checkstyle" },
      { value: "golangci", label: "golangci-lint" },
      { value: "none", label: "Пока не требуется" },
    ],
  },
  {
    id: "logging",
    text: "Логирование:",
    options: [
      { value: "winston", label: "Winston" },
      { value: "pino", label: "Pino" },
      { value: "log4j", label: "Log4j" },
      { value: "simple", label: "Простой console.log/print" },
      { value: "none", label: "Без логирования" },
    ],
  },
  {
    id: "docs",
    text: "Документация:",
    options: [
      { value: "swagger", label: "Swagger/OpenAPI" },
      { value: "jsdoc", label: "JSDoc" },
      { value: "sphinx", label: "Sphinx" },
      { value: "readthedocs", label: "ReadTheDocs" },
      { value: "wiki", label: "Wiki" },
      { value: "none", label: "Пока не требуется" },
    ],
  },
];

const structures = {
  web_app_react: {
    dirs: [
      "src/components",
      "src/pages",
      "src/hooks",
      "src/services",
      "src/utils",
      "src/styles",
      "src/assets",
      "src/types",
      "src/store",
      "public",
    ],
    files: [
      "src/App.jsx",
      "src/index.jsx",
      "src/routes.jsx",
      "src/api/client.js",
      "src/utils/constants.js",
      "src/utils/helpers.js",
      "public/index.html",
      "package.json",
      "vite.config.js",
      ".env.example",
      ".gitignore",
      "README.md",
    ],
  },
  web_app_vue: {
    dirs: [
      "src/components",
      "src/views",
      "src/router",
      "src/store",
      "src/composables",
      "src/utils",
      "src/assets",
      "src/styles",
      "src/api",
      "public",
    ],
    files: [
      "src/App.vue",
      "src/main.js",
      "src/router/index.js",
      "src/store/index.js",
      "src/api/index.js",
      "public/index.html",
      "package.json",
      "vite.config.js",
      ".env.example",
      ".gitignore",
      "README.md",
    ],
  },
  backend_api_express: {
    dirs: [
      "src/controllers",
      "src/models",
      "src/routes",
      "src/middlewares",
      "src/services",
      "src/utils",
      "src/config",
      "src/validators",
      "src/repositories",
      "tests",
    ],
    files: [
      "src/app.js",
      "src/server.js",
      "src/config/database.js",
      "src/utils/logger.js",
      "src/utils/errorHandler.js",
      "tests/setup.js",
      "package.json",
      ".env.example",
      ".gitignore",
      "Dockerfile",
      "README.md",
    ],
  },
  backend_api_nestjs: {
    dirs: [
      "src/modules",
      "src/common",
      "src/config",
      "src/database",
      "src/utils",
      "test",
    ],
    files: [
      "src/main.ts",
      "src/app.module.ts",
      "src/common/filters/http-exception.filter.ts",
      "src/common/interceptors/transform.interceptor.ts",
      "src/config/configuration.ts",
      "nest-cli.json",
      "package.json",
      "tsconfig.json",
      ".env.example",
      ".gitignore",
      "Dockerfile",
      "README.md",
    ],
  },
  fullstack: {
    dirs: [
      "client/src/components",
      "client/src/pages",
      "client/src/hooks",
      "client/src/styles",
      "server/src/controllers",
      "server/src/models",
      "server/src/routes",
      "server/src/services",
      "server/src/middlewares",
      "shared/types",
      "shared/utils",
      "docker",
      "scripts",
    ],
    files: [
      "client/package.json",
      "client/vite.config.js",
      "server/package.json",
      "server/src/app.js",
      "server/src/server.js",
      "shared/index.js",
      "docker-compose.yml",
      "package.json",
      ".env.example",
      ".gitignore",
      "README.md",
    ],
  },
  microservice: {
    dirs: [
      "src/handlers",
      "src/services",
      "src/models",
      "src/utils",
      "src/config",
      "src/middlewares",
      "tests/unit",
      "tests/integration",
      "scripts",
      "kubernetes",
    ],
    files: [
      "src/index.js",
      "src/handlers/eventHandler.js",
      "src/services/businessLogic.js",
      "src/utils/logger.js",
      "src/config/index.js",
      "Dockerfile",
      "docker-compose.yml",
      "package.json",
      ".env.example",
      ".gitignore",
      "kubernetes/deployment.yaml",
      "kubernetes/service.yaml",
      "README.md",
    ],
  },
  cli_tool: {
    dirs: [
      "src/commands",
      "src/utils",
      "src/config",
      "src/templates",
      "bin",
      "tests",
    ],
    files: [
      "src/index.js",
      "src/commands/init.js",
      "src/commands/build.js",
      "src/utils/helpers.js",
      "bin/cli.js",
      "package.json",
      "README.md",
      ".gitignore",
      "LICENSE",
    ],
  },
  library: {
    dirs: ["src/core", "src/utils", "tests", "examples", "dist"],
    files: [
      "src/index.js",
      "src/core/index.js",
      "tests/index.test.js",
      "examples/basic.js",
      "package.json",
      "README.md",
      ".gitignore",
      "rollup.config.js",
      "LICENSE",
    ],
  },
};

function askQuestion(question) {
  return new Promise((resolve) => {
    console.log(`\n📌 ${question.text}`);
    console.log("   " + "─".repeat(50));
    question.options.forEach((opt, idx) => {
      const num = (idx + 1).toString().padStart(2);
      console.log(`   ${num}. ${opt.label}`);
    });
    rl.question(
      "\n   👉 Ваш выбор (1-" + question.options.length + "): ",
      (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < question.options.length) {
          resolve(question.options[index].value);
        } else {
          console.log("   ⚠️  Неверный выбор, выбран первый вариант");
          resolve(question.options[0].value);
        }
      },
    );
  });
}

async function collectAnswers() {
  const answers = {};
  for (const q of questions) {
    answers[q.id] = await askQuestion(q);
  }
  return answers;
}

function generateStructure(answers) {
  const projectType = answers.project_type;
  const framework = answers.framework;

  let structureKey = projectType;

  if (projectType === "web_app" && framework === "react") {
    structureKey = "web_app_react";
  } else if (projectType === "web_app" && framework === "vue") {
    structureKey = "web_app_vue";
  } else if (projectType === "backend_api" && framework === "express") {
    structureKey = "backend_api_express";
  } else if (projectType === "backend_api" && framework === "nestjs") {
    structureKey = "backend_api_nestjs";
  } else if (projectType === "fullstack") {
    structureKey = "fullstack";
  } else if (projectType === "microservice") {
    structureKey = "microservice";
  } else if (projectType === "cli_tool") {
    structureKey = "cli_tool";
  } else if (projectType === "library") {
    structureKey = "library";
  } else {
    structureKey = "backend_api_express";
  }

  let baseStructure =
    structures[structureKey] || structures.backend_api_express;

  const additionalDirs = [];
  const additionalFiles = [];

  if (answers.database !== "none") {
    additionalDirs.push("src/migrations", "src/seeders");
    additionalFiles.push("src/config/database.js", "docker-compose.db.yml");
  }

  if (answers.testing !== "none") {
    additionalDirs.push("tests/unit", "tests/integration", "tests/e2e");
    additionalFiles.push(
      `tests/${answers.testing}.config.js`,
      "tests/fixtures/data.js",
    );
  }

  if (answers.orm !== "none") {
    additionalDirs.push("src/entities", "src/repositories", "src/dto");
    additionalFiles.push(`src/config/${answers.orm}.js`);
  }

  if (answers.docs !== "none") {
    additionalDirs.push("docs");
    additionalFiles.push("docs/API.md", "docs/ARCHITECTURE.md");
  }

  if (answers.deployment === "docker") {
    additionalFiles.push("Dockerfile", "docker-compose.yml", ".dockerignore");
  }

  if (answers.deployment === "kubernetes") {
    additionalDirs.push("k8s");
    additionalFiles.push(
      "k8s/deployment.yaml",
      "k8s/service.yaml",
      "k8s/configmap.yaml",
    );
  }

  if (answers.ci_cd !== "none") {
    additionalDirs.push(".github/workflows");
    additionalFiles.push(`.github/workflows/${answers.ci_cd}.yml`);
  }

  if (answers.code_style !== "none") {
    if (answers.code_style === "eslint") {
      additionalFiles.push(".eslintrc.js", ".prettierrc", ".prettierignore");
    } else if (answers.code_style === "pylint") {
      additionalFiles.push(".pylintrc", ".black");
    }
  }

  if (
    answers.logging !== "none" &&
    answers.logging !== "simple" &&
    answers.logging !== "none"
  ) {
    additionalFiles.push(`src/utils/logger.js`);
  }

  const finalDirs = [...baseStructure.dirs, ...additionalDirs];
  const finalFiles = [...baseStructure.files, ...additionalFiles];

  return { dirs: finalDirs, files: finalFiles, answers };
}

function printAsciiTree(structure, projectName) {
  console.log("\n   🌳 ДЕРЕВО СТРУКТУРЫ ПРОЕКТА");
  console.log("   " + "═".repeat(60));
  console.log(`   📁 ${projectName}/`);

  const allItems = [
    ...structure.dirs.map((d) => ({ type: "dir", path: d })),
    ...structure.files.map((f) => ({ type: "file", path: f })),
  ];

  const tree = {};
  allItems.forEach((item) => {
    const parts = item.path.split("/");
    let current = tree;
    parts.forEach((part, idx) => {
      if (!current[part]) {
        current[part] = {
          type: idx === parts.length - 1 ? item.type : "dir",
          children: {},
        };
      }
      current = current[part].children;
    });
  });

  function printNode(node, prefix = "", isLast = true) {
    const entries = Object.entries(node);
    entries.forEach(([name, data], idx) => {
      const isLastItem = idx === entries.length - 1;
      const connector = isLastItem ? "└── " : "├── ";
      const icon = data.type === "dir" ? "📂" : "📄";
      console.log(`   ${prefix}${connector}${icon} ${name}`);
      if (data.type === "dir" && Object.keys(data.children).length > 0) {
        const newPrefix = prefix + (isLastItem ? "    " : "│   ");
        printNode(data.children, newPrefix, isLastItem);
      }
    });
  }

  printNode(tree);
  console.log("   " + "═".repeat(60));
}

function printDetailedStructure(structure) {
  console.log("\n   📊 ДЕТАЛЬНАЯ СТРУКТУРА");
  console.log("   " + "═".repeat(60));

  console.log("\n   📁 КАТАЛОГИ (" + structure.dirs.length + " шт.):");
  console.log("   " + "─".repeat(50));
  structure.dirs.forEach((dir) => {
    const parts = dir.split("/");
    const depth = parts.length;
    const indent = "   " + "  ".repeat(depth);
    console.log(
      `${indent}📂 ${parts[parts.length - 1]}  ${"─".repeat(30)} ${dir}`,
    );
  });

  console.log("\n   📄 ФАЙЛЫ (" + structure.files.length + " шт.):");
  console.log("   " + "─".repeat(50));
  structure.files.forEach((file) => {
    const parts = file.split("/");
    const depth = parts.length;
    const indent = "   " + "  ".repeat(depth);
    console.log(
      `${indent}📄 ${parts[parts.length - 1]}  ${"─".repeat(30)} ${file}`,
    );
  });

  console.log("\n   " + "═".repeat(60));
}

function printConfigSummary(answers) {
  console.log("\n   ⚙️  КОНФИГУРАЦИЯ ПРОЕКТА");
  console.log("   " + "═".repeat(60));

  const config = {
    "Тип проекта": answers.project_type,
    Фреймворк: answers.framework,
    Язык: answers.language,
    "База данных": answers.database,
    Тестирование: answers.testing,
    ORM: answers.orm,
    Архитектура: answers.architecture,
    Деплоймент: answers.deployment,
    "CI/CD": answers.ci_cd,
    "Code Style": answers.code_style,
    Логирование: answers.logging,
    Документация: answers.docs,
  };

  if (answers.state_management && answers.state_management !== "none") {
    config["Управление состоянием"] = answers.state_management;
  }

  if (answers.styling && answers.styling !== "none") {
    config["Стилизация"] = answers.styling;
  }

  const maxKeyLen = Math.max(...Object.keys(config).map((k) => k.length));

  Object.entries(config).forEach(([key, value]) => {
    const padding = " ".repeat(maxKeyLen - key.length);
    console.log(`   📌 ${key}:${padding} ${value}`);
  });

  console.log("   " + "═".repeat(60));
}

function saveStructureToFile(structure, answers, projectName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `structure_${projectName}_${timestamp}.json`;
  const filepath = path.join(process.cwd(), filename);

  const exportData = {
    projectName: projectName,
    createdAt: new Date().toISOString(),
    config: answers,
    structure: {
      directories: structure.dirs,
      files: structure.files,
      totalDirs: structure.dirs.length,
      totalFiles: structure.files.length,
    },
  };

  fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));
  return { filename, filepath };
}

function saveStructureAsText(structure, answers, projectName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `structure_${projectName}_${timestamp}.txt`;
  const filepath = path.join(process.cwd(), filename);

  let content = [];
  content.push("═".repeat(80));
  content.push(`СТРУКТУРА ПРОЕКТА: ${projectName}`);
  content.push(`Дата генерации: ${new Date().toLocaleString()}`);
  content.push("═".repeat(80));
  content.push("");
  content.push("📋 КОНФИГУРАЦИЯ:");
  content.push("─".repeat(80));

  Object.entries(answers).forEach(([key, value]) => {
    content.push(`  ${key}: ${value}`);
  });

  content.push("");
  content.push("📁 КАТАЛОГИ:");
  content.push("─".repeat(80));
  structure.dirs.forEach((dir) => {
    content.push(`  ${dir}`);
  });

  content.push("");
  content.push("📄 ФАЙЛЫ:");
  content.push("─".repeat(80));
  structure.files.forEach((file) => {
    content.push(`  ${file}`);
  });

  content.push("");
  content.push("📊 СТАТИСТИКА:");
  content.push("─".repeat(80));
  content.push(`  Всего каталогов: ${structure.dirs.length}`);
  content.push(`  Всего файлов: ${structure.files.length}`);
  content.push(
    `  Общее количество элементов: ${structure.dirs.length + structure.files.length}`,
  );

  content.push("");
  content.push("═".repeat(80));
  content.push("Конец файла структуры");
  content.push("═".repeat(80));

  fs.writeFileSync(filepath, content.join("\n"));
  return { filename, filepath };
}

function saveCreationScript(structure, projectName) {
  const filename = `create_${projectName}.sh`;
  const filepath = path.join(process.cwd(), filename);

  let script = [];
  script.push("#!/bin/bash");
  script.push("");
  script.push(`# Скрипт для создания структуры проекта: ${projectName}`);
  script.push(`# Дата генерации: ${new Date().toLocaleString()}`);
  script.push("");
  script.push(`echo "🏗️  Создание структуры проекта: ${projectName}"`);
  script.push(`echo "═".repeat(60)`);
  script.push("");
  script.push(`mkdir -p ${projectName}`);
  script.push(`cd ${projectName}`);
  script.push("");

  structure.dirs.forEach((dir) => {
    script.push(`mkdir -p ${dir}`);
  });

  structure.files.forEach((file) => {
    script.push(`touch ${file}`);
  });

  script.push("");
  script.push(`echo ""`);
  script.push(`echo "✅ Структура проекта успешно создана!"`);
  script.push(`echo "📁 Создано каталогов: ${structure.dirs.length}"`);
  script.push(`echo "📄 Создано файлов: ${structure.files.length}"`);
  script.push(`echo ""`);
  script.push(`tree -L 3 2>/dev/null || ls -la`);
  script.push(`echo ""`);
  script.push(`echo "🚀 Для запуска выполните:"`);
  script.push(`echo "  cd ${projectName}"`);
  script.push(`echo "  npm install  # или другой менеджер пакетов"`);
  script.push(`echo "  npm run dev   # или другая команда запуска"`);

  fs.writeFileSync(filepath, script.join("\n"));
  fs.chmodSync(filepath, "755");
  return { filename, filepath };
}

async function main() {
  console.clear();
  console.log("╔" + "═".repeat(78) + "╗");
  console.log(
    "║" +
      " ".repeat(20) +
      "🏗️  АРХИТЕКТОР СТРУКТУРЫ ПРОЕКТА" +
      " ".repeat(20) +
      "║",
  );
  console.log("╚" + "═".repeat(78) + "╝");
  console.log("\n   📐 Инструмент для создания идеальной структуры проекта");
  console.log(
    "   💡 Ответьте на вопросы, чтобы получить оптимальную структуру\n",
  );

  rl.question("   📝 Введите название проекта: ", async (projectName) => {
    if (!projectName.trim()) {
      projectName = "my-awesome-project";
    }

    console.log("\n   🚀 НАЧИНАЕМ ОПРОС");
    console.log("   " + "═".repeat(60));

    const answers = await collectAnswers();

    console.log("\n   🔨 ГЕНЕРАЦИЯ СТРУКТУРЫ...");
    const structure = generateStructure(answers);

    console.clear();
    console.log("╔" + "═".repeat(78) + "╗");
    console.log(
      "║" + " ".repeat(25) + "✨ РЕЗУЛЬТАТ ГЕНЕРАЦИИ ✨" + " ".repeat(26) + "║",
    );
    console.log("╚" + "═".repeat(78) + "╝");

    printAsciiTree(structure, projectName);
    printDetailedStructure(structure);
    printConfigSummary(answers);

    console.log("\n   💾 СОХРАНЕНИЕ СТРУКТУРЫ");
    console.log("   " + "═".repeat(60));

    const jsonResult = saveStructureToFile(structure, answers, projectName);
    const txtResult = saveStructureAsText(structure, answers, projectName);
    const scriptResult = saveCreationScript(structure, projectName);

    console.log(`\n   ✅ JSON структура: ${jsonResult.filename}`);
    console.log(`   ✅ Текстовая структура: ${txtResult.filename}`);
    console.log(`   ✅ Bash скрипт: ${scriptResult.filename}`);

    console.log("\n   📊 СТАТИСТИКА ПРОЕКТА:");
    console.log("   " + "─".repeat(50));
    console.log(`   📁 Каталогов: ${structure.dirs.length}`);
    console.log(`   📄 Файлов: ${structure.files.length}`);
    console.log(
      `   📦 Всего элементов: ${structure.dirs.length + structure.files.length}`,
    );

    console.log("\n   🚀 СЛЕДУЮЩИЕ ШАГИ:");
    console.log("   " + "─".repeat(50));
    console.log(`   1. Запустите скрипт: ./${scriptResult.filename}`);
    console.log(`   2. Или используйте: bash ${scriptResult.filename}`);
    console.log(
      `   3. Изучите структуру в файлах: ${jsonResult.filename} или ${txtResult.filename}`,
    );
    console.log("   4. Установите необходимые зависимости");
    console.log("   5. Начните разработку!");

    console.log("\n   " + "═".repeat(60));
    console.log("   🎉 СТРУКТУРА ГОТОВА! УДАЧНОЙ РАЗРАБОТКИ! 🎉");
    console.log("   " + "═".repeat(60));

    rl.close();
  });
}

main();
