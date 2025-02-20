// 配置管理类
class ConfigManager {
  private static instance: ConfigManager
  private config: Record<string, any> = {}

  private constructor() {
    this.loadConfig()
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  // 加载配置
  private loadConfig() {
    this.config = {
      apiVersion: process.env.API_VERSION || 'v1',
      environment: process.env.NODE_ENV || 'development',
      serverPort: process.env.PORT || 3000,
      // 其他配置项...
    }
    console.log('配置加载完成:', this.config)
  }

  // 获取配置
  get(key: string) {
    return this.config[key]
  }
}

export const config = ConfigManager.getInstance() 