import { NewsArticleData } from '../utils/types';
import OpenAI from 'openai';

// Initialize OpenAI client if API key is available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const MODEL = 'gpt-3.5-turbo';

// Interface for AI analysis results
interface AIAnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  readingTimeMinutes: number;
  relevanceScore: number;
}

// Estimate reading time in minutes
const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

// Check if AI is available or if we should use mock data
const isAIAvailable = (): boolean => {
  return !!openai && !!process.env.OPENAI_API_KEY;
};

// Analyze content with OpenAI
export const analyzeContent = async (title: string, content: string): Promise<AIAnalysisResult> => {
  console.log(`Analyzing content: ${title}`);
  
  // Use mock data if OpenAI is not available
  if (!isAIAvailable()) {
    console.log('Using mock AI analysis (OpenAI API key not configured)');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative',
      keywords: ['Radzyń', 'inwestycje', 'kultura', 'miasto'].slice(0, Math.floor(Math.random() * 4) + 1),
      readingTimeMinutes: estimateReadingTime(content),
      relevanceScore: Math.random() * 0.5 + 0.5 // 0.5 to 1.0
    };
  }
  
  try {
    // Prepare a shortened version of the content if it's too long
    const maxChars = 2000;
    const truncatedContent = content.length > maxChars 
      ? content.substring(0, maxChars) + '...'
      : content;
    
    const prompt = `
    Analyze the following news article from Radzyń Podlaski, Poland. 
    
    Title: "${title}"
    
    Content: "${truncatedContent}"
    
    Provide the following analysis in JSON format:
    1. sentiment: Determine if the article's tone is "positive", "neutral", or "negative"
    2. keywords: Extract 3-5 most important keywords or topics (in Polish)
    3. relevance_score: Rate from 0-1 how relevant this article is to the Radzyń Podlaski community (where 1 is highly relevant)
    
    Return only valid JSON with no explanation.
    `;
    
    const response = await openai!.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });
    
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }
    
    const result = JSON.parse(content);
    
    return {
      sentiment: result.sentiment as 'positive' | 'neutral' | 'negative',
      keywords: Array.isArray(result.keywords) ? result.keywords : [],
      readingTimeMinutes: estimateReadingTime(content),
      relevanceScore: typeof result.relevance_score === 'number' ? result.relevance_score : 0.7
    };
  } catch (error) {
    console.error('Error using OpenAI for content analysis:', error);
    
    // Fallback to basic analysis
    return {
      sentiment: 'neutral',
      keywords: title.toLowerCase().split(' ').filter(word => word.length > 4),
      readingTimeMinutes: estimateReadingTime(content),
      relevanceScore: 0.7
    };
  }
};

// Map of available categories
const VALID_CATEGORIES = {
  'miasto': 'miasto',
  'kultura': 'kultura',
  'sport': 'sport',
  'inwestycje': 'inwestycje',
  'edukacja': 'edukacja',
  'zdrowie': 'zdrowie',
  'inne': 'inne'
};

// Categorize an article
export const categorizeArticle = async (title: string, content: string): Promise<string> => {
  console.log(`Categorizing article: ${title}`);
  
  // Use mock data if OpenAI is not available
  if (!isAIAvailable()) {
    console.log('Using mock categorization (OpenAI API key not configured)');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const categories = Object.keys(VALID_CATEGORIES);
    return categories[Math.floor(Math.random() * categories.length)];
  }
  
  try {
    // Prepare a shortened version of the content if it's too long
    const maxChars = 1500; 
    const truncatedContent = content.length > maxChars 
      ? content.substring(0, maxChars) + '...'
      : content;
    
    const prompt = `
    Categorize the following news article from Radzyń Podlaski, Poland.
    
    Title: "${title}"
    
    Content: "${truncatedContent}"
    
    Choose ONE category from the following list:
    - miasto (city affairs, local government)
    - kultura (culture, arts, heritage)
    - sport (sports, recreation)
    - inwestycje (investments, development projects)
    - edukacja (education, schools)
    - zdrowie (health, healthcare)
    - inne (other topics)
    
    Return only the category name in lowercase without explanation.
    `;
    
    const response = await openai!.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 10
    });
    
    const category = response.choices[0]?.message?.content?.trim().toLowerCase();
    
    // Validate that the category is one of our valid categories
    if (category && VALID_CATEGORIES[category as keyof typeof VALID_CATEGORIES]) {
      return category;
    } else {
      console.warn(`Invalid category returned by AI: ${category}. Using 'inne' instead.`);
      return 'inne';
    }
  } catch (error) {
    console.error('Error using OpenAI for categorization:', error);
    return 'inne'; // Default category if there's an error
  }
};

// Valid tags for reference
const VALID_TAGS = [
  'miasto', 'inwestycje', 'koncert', 'sport', 'edukacja', 'kultura',
  'zdrowie', 'wydarzenia', 'rada-miasta', 'infrastruktura'
];

// Extract tags from an article
export const extractTags = async (title: string, content: string): Promise<string[]> => {
  console.log(`Extracting tags from article: ${title}`);
  
  // Use mock data if OpenAI is not available
  if (!isAIAvailable()) {
    console.log('Using mock tags (OpenAI API key not configured)');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const numTags = Math.floor(Math.random() * 3) + 1;
    return Array.from(new Set(VALID_TAGS.sort(() => 0.5 - Math.random()).slice(0, numTags)));
  }
  
  try {
    // Prepare a shortened version of the content if it's too long
    const maxChars = 1500;
    const truncatedContent = content.length > maxChars 
      ? content.substring(0, maxChars) + '...'
      : content;
    
    const prompt = `
    Extract relevant tags for the following news article from Radzyń Podlaski, Poland.
    
    Title: "${title}"
    
    Content: "${truncatedContent}"
    
    Choose 2-4 tags from the following list:
    ${VALID_TAGS.join(', ')}
    
    Return the tags as a JSON array of strings (only the tag IDs in lowercase).
    Example return format: ["miasto", "inwestycje"]
    `;
    
    const response = await openai!.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });
    
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }
    
    try {
      const result = JSON.parse(content);
      if (Array.isArray(result.tags || result)) {
        const tags = result.tags || result;
        
        // Filter to valid tags only
        const validTags = tags.filter((tag: string) => 
          VALID_TAGS.includes(tag.toLowerCase())
        ).map((tag: string) => tag.toLowerCase());
        
        // Ensure we have at least one tag
        if (validTags.length === 0) {
          // If no valid tags, assign a default based on the category
          return ['miasto'];
        }
        
        return validTags;
      }
    } catch (err) {
      console.error('Error parsing tags JSON:', err);
    }
    
    // Fallback if there's an error with parsing
    return ['miasto'];
  } catch (error) {
    console.error('Error using OpenAI for tag extraction:', error);
    return ['miasto']; // Default tag if there's an error
  }
};

// Generate a summary for an article
export const generateSummary = async (content: string): Promise<string> => {
  console.log(`Generating summary for content length: ${content.length}`);
  
  // Use mock data if OpenAI is not available
  if (!isAIAvailable()) {
    console.log('Using mock summary (OpenAI API key not configured)');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Simple summary - first sentence
    return content.split('.')[0] + '.';
  }
  
  try {
    // Prepare a shortened version of the content if it's too long
    const maxChars = 4000;
    const truncatedContent = content.length > maxChars 
      ? content.substring(0, maxChars) + '...'
      : content;
    
    const prompt = `
    Create a concise summary (1-2 sentences) of the following news article from Radzyń Podlaski, Poland.
    The summary should capture the main point and be in Polish.
    
    Article content: "${truncatedContent}"
    
    Return only the summary text, no more than 200 characters.
    `;
    
    const response = await openai!.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 150
    });
    
    const summary = response.choices[0]?.message?.content?.trim();
    
    if (summary) {
      return summary;
    } else {
      throw new Error('No summary generated');
    }
  } catch (error) {
    console.error('Error using OpenAI for summary generation:', error);
    
    // Fallback to first sentence if there's an error
    return content.split('.')[0] + '.';
  }
};

// Suggest related articles based on content similarity
export const suggestRelatedArticles = async (
  article: NewsArticleData, 
  allArticles: NewsArticleData[]
): Promise<string[]> => {
  console.log(`Finding related articles for: ${article.title}`);
  
  // Simple implementation that doesn't require AI
  // We'll match based on category and tags
  
  // Filter out the current article
  const otherArticles = allArticles.filter(a => a.id !== article.id);
  
  if (otherArticles.length === 0) {
    return [];
  }
  
  // Score each article by relevance
  const scoredArticles = otherArticles.map(a => {
    let score = 0;
    
    // Same category is a strong signal
    if (a.categoryId === article.categoryId) {
      score += 5;
    }
    
    // Shared tags increase relevance
    const sharedTags = a.tagIds.filter(tag => article.tagIds.includes(tag));
    score += sharedTags.length * 2;
    
    // Recent articles are more relevant
    const articleDate = new Date(article.date);
    const comparisonDate = new Date(a.date);
    const dayDiff = Math.abs((articleDate.getTime() - comparisonDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff < 7) {
      score += 2;
    } else if (dayDiff < 30) {
      score += 1;
    }
    
    return { article: a, score };
  });
  
  // Sort by score and return top 3
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.article.id);
};

// Score content for quality and relevance (1-10)
export const scoreContentQuality = async (title: string, content: string): Promise<number> => {
  console.log(`Scoring content quality for: ${title}`);
  
  // Use mock data if OpenAI is not available
  if (!isAIAvailable()) {
    console.log('Using mock quality score (OpenAI API key not configured)');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return Math.floor(Math.random() * 3) + 7; // 7-10 score
  }
  
  try {
    // Prepare a shortened version of the content if it's too long
    const maxChars = 1500;
    const truncatedContent = content.length > maxChars 
      ? content.substring(0, maxChars) + '...'
      : content;
    
    const prompt = `
    Rate the quality of the following news article from Radzyń Podlaski, Poland.
    
    Title: "${title}"
    
    Content: "${truncatedContent}"
    
    On a scale of 1-10, rate the article based on:
    - Writing quality and clarity
    - Informativeness and depth
    - Relevance to local community
    - Overall journalistic quality
    
    Return only a number from 1-10, with no explanation.
    `;
    
    const response = await openai!.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 5
    });
    
    const scoreText = response.choices[0]?.message?.content?.trim();
    const score = scoreText ? parseInt(scoreText, 10) : NaN;
    
    if (!isNaN(score) && score >= 1 && score <= 10) {
      return score;
    } else {
      console.warn(`Invalid score returned by AI: ${scoreText}. Using default score.`);
      return 7;
    }
  } catch (error) {
    console.error('Error using OpenAI for quality scoring:', error);
    return 7; // Default score if there's an error
  }
};