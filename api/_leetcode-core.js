const LEETCODE_API = 'https://leetcode.com/graphql'

const QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    userCalendar {
      streak
      totalActiveDays
    }
  }
  allQuestionsCount {
    difficulty
    count
  }
}
`

export async function fetchLeetCodeStats(username) {
  const response = await fetch(LEETCODE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { username },
    }),
  })

  if (!response.ok) {
    throw new Error('LeetCode API error')
  }

  const { data } = await response.json()
  const matched = data?.matchedUser
  const allQuestions = data?.allQuestionsCount || []

  if (!matched) {
    throw new Error('User not found')
  }

  const acSubs = matched.submitStats?.acSubmissionNum || []
  const totalSubs = matched.submitStats?.totalSubmissionNum || []
  const calendar = matched.userCalendar || {}

  const find = (arr, diff) => arr.find(s => s.difficulty === diff)
  const qFind = (diff) => allQuestions.find(q => q.difficulty === diff)

  const easyQ = qFind('Easy')
  const medQ = qFind('Medium')
  const hardQ = qFind('Hard')

  const easyTotal = easyQ?.count ?? 0
  const mediumTotal = medQ?.count ?? 0
  const hardTotal = hardQ?.count ?? 0

  const allSolved = find(acSubs, 'All')
  const easySolved = find(acSubs, 'Easy')
  const medSolved = find(acSubs, 'Medium')
  const hardSolved = find(acSubs, 'Hard')

  const allTotal = find(totalSubs, 'All')
  const acceptance =
    allSolved && allTotal && allTotal.submissions > 0
      ? Math.round((allSolved.submissions / allTotal.submissions) * 100)
      : 0

  return {
    totalSolved: allSolved?.count ?? 0,
    totalProblems: easyTotal + mediumTotal + hardTotal,
    easySolved: easySolved?.count ?? 0,
    easyTotal,
    mediumSolved: medSolved?.count ?? 0,
    mediumTotal,
    hardSolved: hardSolved?.count ?? 0,
    hardTotal,
    acceptance,
    streak: calendar.streak ?? 0,
    activeDays: calendar.totalActiveDays ?? 0,
  }
}
